import React, { useState, useContext, useMemo } from "react";
import { Spin } from "antd";
import { AuthContext } from "./AuthProvider";
import { useFirestore } from "../hooks/useFireStore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const { user } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    if (!user) return null;
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user]);

  // 1. Phải lấy rooms trước
  const rooms = useFirestore("rooms", roomsCondition);

  // 2. Dùng rooms để lấy selectedRoom
  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);

  // 3. Chỉ tạo điều kiện nếu selectedRoom.members là array
  const usersCondition = useMemo(() => {
    if (!selectedRoom.members || selectedRoom.members.length === 0) return null;
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  // 4. Chỉ gọi nếu có điều kiện hợp lệ
  const members = useFirestore("users", usersCondition) || [];

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
