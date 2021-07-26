import React from 'react'

export default function RightMessage({ message }) {
    return (
        <div className="row no-gutters">
            <div className="col-md-7">
            </div>
            <div className="col-md-5 right-chat">
                <div className="chat-bubble chat-bubble--right">
                    <p>{message.text}</p>
                </div>
            </div>
        </div>
    )
}
