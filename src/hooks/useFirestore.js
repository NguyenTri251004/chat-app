import React from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useFirestore = () => {
  React.useEffect(() => {
    const usersCollection = collection(db, "users"); // Lấy reference của collection "users"

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("User data:", data);
    });

    return () => unsubscribe();
  }, []);
};
