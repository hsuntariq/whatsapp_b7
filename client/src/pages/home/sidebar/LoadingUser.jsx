import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingUser = () => {
    return (
        <div className="d-flex gap-3 align-items-center px-3 py-1">
            <Skeleton width={60} height={60} circle />
            <div className="d-flex justify-content-between w-100">
                <div className="user-info">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={200} />
                </div>
                <div className="time">
                    <Skeleton width={40} height={15} />
                </div>
            </div>
        </div>
    )
}

export default LoadingUser