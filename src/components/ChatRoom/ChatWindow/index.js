import { UserAddOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Tooltip, Alert, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../../firebase/service';
import { EmojiButton } from '@joeattardi/emoji-button';

export default function ChatWindow() {
  const { members, roomIsSelected, setIsInviteMemberVisible, messages } = useContext(AppContext);
  const [contentMessage, setContentMessage] = useState('');
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setContentMessage(e.target.value);
  };

  const handleOnSubmit = () => {
    if (contentMessage === '') return;
    addDocument('messages', {
      text: contentMessage,
      uid,
      photoURL,
      roomId: roomIsSelected.id,
      displayName,
    });
    setContentMessage('');
  }

  const picker = new EmojiButton();
  const trigger = document.querySelector('.trigger');

  picker.on('emoji', selection => {
    let messageWithEmoji = contentMessage + selection.emoji;
    setContentMessage(messageWithEmoji);
  });
  const handlerShowEmoji = () => {
    picker.togglePicker(trigger);
  }
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);
  return (

    <>
      {roomIsSelected.id ? (
        <>
          <div className="settings-tray">
            <div className="friend-drawer no-gutters friend-drawer--grey">
              <Avatar
                className="profile-image"
                style={{ backgroundColor: roomIsSelected ? roomIsSelected.color : '', fontSize: '25px' }}
                src={roomIsSelected.image ? roomIsSelected.image : ''}
              >
                {roomIsSelected.image ? '' : roomIsSelected.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="text">
                <h6>{roomIsSelected.name}</h6>
                <p className="text-muted">{roomIsSelected ? roomIsSelected.description : ''}</p>
              </div>
              <span className="settings-tray--right">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="Mời thêm thành viên">
                    <Button ghost onClick={() => setIsInviteMemberVisible(true)} type="primary" shape="circle" icon={<UserAddOutlined />} style={{ marginRight: '5px' }} />
                  </Tooltip>
                  <Avatar.Group size='large' maxCount={2}>
                    {members.map((member) => (
                      <Tooltip title={member.uid === roomIsSelected.admin ? 'Quản trị viên: ' + member.displayName : member.displayName} key={member.id}>
                        <Avatar style={{ backgroundColor: member.color }} src={member.photoURL}>
                          {member.photoURL
                            ? ''
                            : member.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>
              </span>
            </div>
          </div>
        </>
      ) : (
        <Alert
          message='Hãy chọn phòng'
          type='info'
          showIcon
          closable
        />
      )}

      <div className="chat-panel" ref={messageListRef}>
        {
          messages.map((mes, index) => {
            return (
              mes.uid === uid ? <RightMessage key={index} message={mes} /> : <LeftMessage key={index} message={mes} />
            )
          })
        }

        {roomIsSelected.id ? (
          <>
            <div className="row no-gutters" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
              <div className="col-12">
                <div className="chat-box-tray">
                  <Button className="trigger" icon={<SmileOutlined />} onClick={handlerShowEmoji} />
                  <Input
                    id="input-message"
                    placeholder="Nhập tin nhắn của bạn..."
                    onPressEnter={handleOnSubmit}
                    onChange={handleInputChange}
                    autoComplete='off'
                    value={contentMessage}
                  />
                  <Button icon={<SendOutlined />} onClick={handleOnSubmit} />

                </div>
              </div>
            </div>
          </>
        ) : ("")}

      </div>
    </>

  )
}
