import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { addDocument } from "../../firebase/services";

const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {
    const handleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, fbProvider);
          const user = result.user;
          const additionalUserInfo = getAdditionalUserInfo(result);
    
          if (additionalUserInfo?.isNewUser) {
            await addDocument("users", {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              providerId: additionalUserInfo.providerId || "facebook.com",
            });
          }
        } catch (error) {
          console.error("Lỗi đăng nhập:", error);
        }
      };
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
