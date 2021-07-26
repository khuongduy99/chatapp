import React, { useContext } from 'react'
import { Button, Form, Input } from 'antd'
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/service';
import { LoginOutlined, FacebookFilled, GooglePlusSquareFilled } from '@ant-design/icons';
import { AppContext } from '../Context/AppProvider';

const fbProvider = new firebase.auth.FacebookAuthProvider();


export default function Login() {
    const [form] = Form.useForm();

    const { setRegisterVisible } = useContext(AppContext);
    const handleFBLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            });
        }
    }

    const handleLogin = async () => {
        auth.signInWithEmailAndPassword(form.getFieldValue(['email']), form.getFieldValue(['password']));
    }

    const handleRegister = () => {
        setRegisterVisible(true);
    }

    return (
        <div>
            <div id="logreg-forms">
                <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}> Đăng nhập</h1>
                <div className="social-login">
                    <Button onClick={handleFBLogin} className="btn facebook-btn social-btn" icon={<FacebookFilled />}>
                        Đăng nhập với Facebook
                    </Button>
                    <Button className="btn google-btn social-btn" icon={<GooglePlusSquareFilled />}>
                        Đăng nhập với Google
                    </Button>

                </div>
                <p style={{ textAlign: 'center' }}> HOẶC</p>
                <Form
                    form={form}
                    name="basic"
                    layout='vertical'
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng không để trống tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng không để trống mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" icon={<LoginOutlined />} className="btn btn-success btn-block" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>

                </Form>
                <hr />
                <button onClick={handleRegister} className="btn btn-success btn-block"> Chưa có tài khoản?... Đăng ký ngay</button>

            </div>

        </div>
    )
}
