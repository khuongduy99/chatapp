
import React from 'react'
import HeaderPage from './HeaderPage';
import ChatWindow from './ChatWindow';
import SideBarLeft from './SideBarLeft';
export default function ChatRoom() {

    return (
        <>
            <HeaderPage />
            <div className="container" style={{ border: '1px solid #d2bebe' }}>
                <div className="row no-gutters">
                    <div className="col-md-4 border-right" style={{ height: '650px', overflow: 'hidden', overflowY: 'scroll' }}>
                        <SideBarLeft />
                    </div>
                    <div className="col-md-8">
                        <ChatWindow />
                    </div>
                </div>
            </div>
        </>
    )
}
