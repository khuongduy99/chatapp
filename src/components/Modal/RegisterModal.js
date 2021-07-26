import { Modal, Form, Input, Button, Alert } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppProvider';
import { addDocument, generateKeywords } from '../../firebase/service';
import { auth } from '../../firebase/config';

export default function RegisterModal() {
    const { isRegisterVisible, setRegisterVisible } = useContext(AppContext);
    const [form] = Form.useForm();
    const [isAlertErrorVisible, setAlertErrorVisible] = useState(false);


    const onSubmit = async () => {
        await auth.createUserWithEmailAndPassword(form.getFieldValue(['email']), form.getFieldValue(['password']))
            .then((u) => {
                const uu = auth.currentUser;
                uu.updateProfile({
                    displayName: form.getFieldValue(['displayName']),
                    photoURL: form.getFieldValue(['photoURL'])
                })
                let photo = form.getFieldValue(['photoURL']);
                if (!photo) {
                    photo = '';
                }
                setRegisterVisible(false);
                setAlertErrorVisible(false);
                addDocument('users', {
                    displayName: form.getFieldValue(['displayName']),
                    email: form.getFieldValue(['email']),
                    photoURL: photo,
                    uid: uu.uid,
                    keywords: generateKeywords(form.getFieldValue(['displayName']).toLowerCase())
                });
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
                setAlertErrorVisible(true);
            })
    }

    const handleCancel = () => {
        setRegisterVisible(false);
    }
    const handleResetFrom = () => {
        form.resetFields();
    }

    return (

        <div>
            <Modal title="Đăng ký" visible={isRegisterVisible} footer={[]} onCancel={handleCancel}>
                {(isAlertErrorVisible ?
                    <Alert visible={isAlertErrorVisible} message="Email đăng ký này đã tồn tại" type="error" showIcon /> :
                    '')}

                <Form form={form} layout='vertical' onFinish={onSubmit}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng định dạng Email!' }]}>
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password" placeholder="Nhập mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng không để trống mật khẩu!'
                            },
                            {
                                pattern: /^(?=\D*\d)\S{6,}$/,
                                message: 'Mật khẩu nên có ít nhất 6 ký tự!'
                            }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Tên hiển thị" name="displayName" rules={[{ required: true, message: 'Vui lòng không để trống tên hiển thị!' }]}>
                        <Input placeholder="Nhập tên hiển thị" />
                    </Form.Item>
                    <Form.Item label="Ảnh hiển thị" name="photoURL">
                        <Input placeholder="Nhập URL ảnh" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Đăng ký
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
