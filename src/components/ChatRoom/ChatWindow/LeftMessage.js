import { Avatar } from 'antd'
import React from 'react'

export default function LeftMessage({ message }) {
    return (
        <div className="row no-gutters">
            <div className="col-md-7">
                <div className="media">
                    <Avatar style={{marginTop: '15px'}} src={message.photoURL ? message.photoURL : ''}>
                        {message.photoURL ? '' : message.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="chat-bubble chat-bubble--left" title="Posted on February 19, 2016">
                        <h6> {message.displayName} </h6>
                        <p>{message.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
