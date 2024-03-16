import React, { useState } from 'react'
import { toast } from 'react-toastify'
const Audio = () => {
    const [recording, setRecording] = useState(false)
    const [stream, setStream] = useState(null);
    const [mRecorder, setMRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);


    const startRecording = async () => {
        try {
            setRecording(true);
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(audioStream);
            let recorder = new MediaRecorder(audioStream);
            setMRecorder(recorder);
            let chunks = [];
            recorder.ondataavailable = e => {
                chunks.push(e.data)
            }

            recorder.onstop = () => {
                const blob = new Blob(chunks);
                setAudioBlob(blob)
            }

            recorder.start();

        } catch (error) {
            toast.error('Access denied to the microphone')
        }
    }


    const stopRecording = () => {
        if (mRecorder) {
            console.log(audioBlob)
            setRecording(false);
            mRecorder.stop();
            setStream(null);
            setAudioBlob(null)
        }
    }




    return (
        <>
            {
                recording ? (<button onClick={stopRecording} className="btn btn-danger">
                    Stop Recording
                </button>
                )
                    : (
                        <button onClick={startRecording} className='btn btn-success'>
                            Start Recording
                        </button>
                    )
            }

            {audioBlob && (
                <audio controls>
                    <source src={URL.createObjectURL(audioBlob)} />
                </audio>
            )}

        </>
    )
}

export default Audio