import React, { ReactNode } from 'react';

interface Props{
    message: ReactNode;

}

const Message = ({ message }: Props) => {
    return (
        <>

        <div className="mt-4">
            <div className="bg-blue-500 text-white p-4 rounded-md">
                {message}
            </div>
            <div className="bg-green-500 text-white p-4 rounded-md mt-4">
                {message}
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-md mt-4">
                {message}
            </div>
            <div className="bg-red-500 text-white p-4 rounded-md mt-4">
                {message}
            </div>
        </div>
    </>
    )
}

export default Message;