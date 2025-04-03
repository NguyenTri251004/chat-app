import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd'

import AuthProvider, { AuthContext } from './AuthProvider';
import { useFirestore } from '../hooks/useFireStore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const {
        user: { uid },    
    } = React.useContext(AuthContext);
    /*
    {
        name: 'room name',
        description: 'mo ta',
        members: [uid1, uid2, ...]
    }
    */
   const roomsCondition = React.useMemo(() => {
    return {
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: uid
    }
   }, [uid])
    const rooms = useFirestore('rooms', roomsCondition);
  return (
    <AppContext.Provider value ={{ rooms }}>
        {children}
    </AppContext.Provider>
  )
}
