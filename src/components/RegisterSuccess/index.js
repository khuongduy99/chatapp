import React from 'react'
import { Result, Button } from 'antd';

export default function RegisterSuccess() {

    const handleEnterRoomChat = () => {
        //const url = window.location.hostname;
        window.location.href = '/';
        return;
    }
    return (
        <Result
            status="success"
            title="Đăng ký tài khoản thành công!"
            subTitle="Bắt đầu cuộc trò chuyện của bạn nào!."
            extra={[
                <Button onClick={handleEnterRoomChat} type="primary" key="console">
                    Vào phòng
                </Button>
            ]}
        />
    )
}
