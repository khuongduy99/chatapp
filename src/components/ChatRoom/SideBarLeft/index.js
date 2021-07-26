import { Button, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { PlusOutlined } from '@ant-design/icons';
import Room from './Room';

export default function SideBar() {
    const { rooms, setAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

    const handleAddRoom = () => {
        setAddRoomVisible(true);
    }
    const handleSelectedRoom = (id) => {
        setSelectedRoomId(id);
    }


    return (
        <>
            <div className="settings-tray">
                <Tooltip title="Thêm phòng">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={handleAddRoom} />
                </Tooltip>
            </div>
            {
                rooms.map((room, index) => {
                    return (
                        <a href="/#" onClick={() => handleSelectedRoom(room.id)}>
                            <Room key={index} room={room} />
                        </a>
                    )
                })
            }
        </>
    )
}
