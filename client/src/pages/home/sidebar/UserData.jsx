import React, { useEffect } from 'react'
import SingleUser from './SingleUser'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../features/authentication/authSlice'
import { CircleLoader } from 'react-spinners'
import LoadingUser from './LoadingUser'

const UserData = ({ search, darkMode }) => {
    const dispatch = useDispatch()
    const { allUsers, isLoading } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(getUserData())
    }, [])


    const findUser = () => {
        const foundUsers = allUsers?.filter((foundUser) => {
            return foundUser?.f_name.toLowerCase().startsWith(search)
        })


        return foundUsers;

    }

    useEffect(() => {
        findUser()
    }, [search])


    if (isLoading) {
        return (
            <>
                {Array.from({ length: 7 }).map((_, index) => {
                    return (
                        <>
                            <LoadingUser />
                        </>
                    )
                })}
            </>
        )
    }


    return (
        <>
            <div className="w-100" style={{
                height: '100%',
                overflowY: 'scroll',
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
            }}>

                {findUser()?.map((data, index) => {
                    return <SingleUser darkMode={darkMode} key={index} {...data} />
                })}
            </div>
        </>
    )
}

export default UserData