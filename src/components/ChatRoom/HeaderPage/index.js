import React, { useContext } from 'react'
import { Typography, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import Avatar from 'antd/lib/avatar/avatar'

import { AuthContext } from '../../Context/AuthProvider';
import { auth } from '../../../firebase/config';

const menu = (
    <Menu>
        <Menu.Item onClick={() => { auth.signOut(); }} key="3">Đăng xuất</Menu.Item>
    </Menu>
);
export default function HeaderPage() {

    const { user: { displayName, photoURL, color } } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-inverse" style={{ backgroundColor: '#385898' }}>
            {displayName ? (
                <>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <h1 style={{ color: '#fff' }}>FakeMessage</h1>
                        </div>

                        <ul className="navbar-right" style={{ marginRight: '15px' }}>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a href="/#" style={{ float: 'right' }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Avatar style={{ backgroundColor: color }} src={photoURL}> {photoURL ? '' : displayName.charAt(0).toUpperCase()} </Avatar>
                                    <Typography.Text style={{ color: 'white', marginLeft: '5px' }}>{displayName}</Typography.Text>
                                    <DownOutlined style={{ padding: '6px', borderRadius: '50%', backgroundColor: '#e4e6eb', color: 'black', marginLeft: '5px' }} />
                                </a>
                            </Dropdown>
                        </ul>
                    </div>
                </>
            ) : ("")}

        </nav>
    )
}
