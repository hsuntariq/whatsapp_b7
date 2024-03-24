import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageFooter from "./MessageFooter";
import Messages from "./Messages";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { addChatMessage } from "../../../features/chats/chatSlice";
const socket = io.connect("http://localhost:3001");

const MessageScreen = () => {
    const dispatch = useDispatch();
    const [typing, setTyping] = useState();
    const { id } = useParams();
    const { allUsers, user } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.chat);
    const [message, setMessage] = useState("");
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const displayUserInfo = () => {
        const foundUser = allUsers?.find((myUser) => {
            return myUser?._id === id;
        });

        return foundUser;
    };

    useEffect(() => {
        displayUserInfo();
    }, [id]);

    const sendMessage = (e) => {
        e.preventDefault();
        const chatData = {
            sender_id: user?._id,
            receiver_id: id,
            message,
        };
        // for the backend
        socket.emit("send_message", { message, roomID: chats?._id });
        // for frontend display
        setSentMessages([
            ...sentMessages,
            { message, sent: true, sortID: Date.now(), roomID: chats?._id },
        ]);

        dispatch(addChatMessage(chatData));
        setMessage("");
    };

    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
        return a.sortID - b.sortID;
    });
    useEffect(() => {
        socket.on("received_message", (data) => {
            setReceivedMessages([
                ...receivedMessages,
                {
                    message: data.message,
                    sent: false,
                    sortID: Date.now(),
                    voice: data?.voice,
                    roomID: chats?._id,
                    image: data.image,
                },
            ]);
        });
    }, [receivedMessages]);

    const setRoom = () => {
        socket.emit("join_room", { roomID: chats?._id });
    };

    const handleInput = () => {
        setRoom();
        socket.emit("typing", { typing: true, roomID: chats?._id });
    };

    const handleLeave = () => {
        socket.emit("leave", { typing: false, roomID: chats?._id });
    };

    useEffect(() => {
        socket.on("show_typing", () => {
            setTyping(true);
        });

        socket.on("left", () => {
            setTyping(false);
        });
    }, [socket]);

    // image handling and socket image

    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleImageUpload = async (e) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "xola95pc");

        try {
            setImageLoading(true);
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );

            const imageObject = await res.json();
            setImageLoading(false);
            setImagePreview(null);
            setImage(null);
            return imageObject.url;
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageClick = async () => {
        const data = await handleImageUpload(image);
        if (data) {
            socket.emit("send_message", { image: data, message, roomID: chats?._id });
            setSentMessages([
                ...sentMessages,
                {
                    message,
                    image: data,
                    sent: true,
                    sortID: Date.now(),
                    roomID: chats?._id,
                },
            ]);
        }
    };

    // handle audio

    const [recording, setRecording] = useState(false);
    const [stream, setStream] = useState(null);
    const [myRecorder, setMyRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    // start recording
    const startRecording = async () => {
        try {
            setRecording(true);
            // get the access from the user to the microphone
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setStream(audioStream);
            // get the actual Recorder
            const recorder = new MediaRecorder(audioStream);
            // to make the recorder global
            setMyRecorder(recorder);
            // define an array, that is going to store the buffer
            let chunks = [];
            // start the recording when data is available
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            // when recording stops
            recorder.onstop = () => {
                // make a blob
                const blob = new Blob(chunks);
                setAudioBlob(blob);
                socket.emit("send_message", { voice: blob, roomID: chats?._id });
                setSentMessages([
                    ...sentMessages,
                    { voice: blob, sent: true, roomID: chats?._id, sortID: Date.now() },
                ]);
            };

            // start the recording
            recorder.start();
        } catch (error) {
            toast.error("Please grant access to the microphone to use this feature");
        }
    };

    // stop the recording
    const stopRecording = () => {
        if (myRecorder) {
            setRecording(false);
            myRecorder.stop();
            setMyRecorder(null);
            setStream(null);
            setAudioBlob(null);
        }
    };

    return (
        <>
            <div
                className="w-100 position-relative d-flex flex-column justify-content-between"
                style={{
                    backgroundImage: `url(${displayUserInfo()?.chatTheme})`,
                    height: "100vh",
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                }}
            >
                <MessageHeader typing={typing} displayUserInfo={displayUserInfo} />
                <Messages audioBlob={audioBlob} allMessages={allMessages} />
                <MessageFooter
                    handleImageClick={handleImageClick}
                    image={image}
                    setImage={setImage}
                    imageLoading={imageLoading}
                    setImageLoading={setImageLoading}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    sentMessages={sentMessages}
                    setSentMessages={setSentMessages}
                    handleLeave={handleLeave}
                    handleInput={handleInput}
                    setRoom={setRoom}
                    displayUserInfo={displayUserInfo}
                    sendMessage={sendMessage}
                    message={message}
                    setMessage={setMessage}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    recording={recording}
                />
            </div>
        </>
    );
};

export default MessageScreen;
