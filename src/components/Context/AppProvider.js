import React, { useState, useMemo, useContext } from 'react'
import useFirestore from '../../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();


export default function AppProvider({ children }) {
    const [isAddRoomVisible, setAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [isRegisterVisible, setRegisterVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const { user: { uid } } = useContext(AuthContext);
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition);

    const roomIsSelected = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const membersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: roomIsSelected.members
        }
    }, [roomIsSelected.members])

    const members = useFirestore('users', membersCondition);

    const messageCondition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: roomIsSelected.id
        }
    }, [roomIsSelected.id])

    const messages = useFirestore('messages', messageCondition);



    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                messages,
                roomIsSelected,
                isAddRoomVisible,
                setAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                isRegisterVisible,
                setRegisterVisible
            }}>
            {children}
        </AppContext.Provider>
    )
}
