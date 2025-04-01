import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Lỗi khi thêm tài liệu:", error);
  }
};