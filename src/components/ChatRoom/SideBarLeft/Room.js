import React from 'react'
import Avatar from 'antd/lib/avatar/avatar';
export default function Room({ room }) {

    return (
        <>
            <div className="friend-drawer friend-drawer--onhover ">
                <Avatar className="profile-image" style={{ backgroundColor: room.color, fontSize: '25px' }} src={room.image}> {room.image ? '' : room.name.charAt(0).toUpperCase()} </Avatar>
                <div className="text">
                    <h6>{room.name}</h6>
                    <p className="text-muted">{room.description}</p>
                </div>
            </div>
            <hr />
        </>
    )
}
