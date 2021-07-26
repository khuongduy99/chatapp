import { Modal, Form, Input, Button } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'
import { AuthContext } from '../Context/AuthProvider';
import { addDocument } from '../../firebase/service';

export default function AddRoomModal() {
    const { isAddRoomVisible, setAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm();
    const onFinish = () => {

        addDocument('rooms', { ...form.getFieldValue(), members: [uid], admin: uid })
        form.resetFields();
        setAddRoomVisible(false);
    }
    const handleCancel = () => {
        setAddRoomVisible(false);
    }
    const handleResetFrom = () => {
        form.resetFields();
    }

    return (

        <div>
            <Modal title="Tạo phòng" visible={isAddRoomVisible} footer={[]} onCancel={handleCancel}>
                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Tên phòng" name="name" rules={[{ required: true, message: 'Vui lòng không để trống tên phòng!' }]}>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item label="Ảnh" name="image">
                        <Input placeholder="Nhập URL ảnh" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button htmlType="button" onClick={handleResetFrom}>
                            Làm trắng
                        </Button>
                        <Button type="danger" htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}
