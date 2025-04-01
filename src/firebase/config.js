import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI5GpfwWQDUDXYdgTcwbFnII7Y1b_N_aU",
  authDomain: "chat-app-4e2ac.firebaseapp.com",
  projectId: "chat-app-4e2ac",
  storageBucket: "chat-app-4e2ac.appspot.com", 
  messagingSenderId: "182818299444",
  appId: "1:182818299444:web:d881a415a1db84dfe9b461",
  measurementId: "G-82WN1PYYYL"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy instance của Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Kết nối với Firebase Emulator khi chạy local
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth };
export default app;
