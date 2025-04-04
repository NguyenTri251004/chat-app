import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip, Form, Input } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;
const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 0px 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rbg(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
export default function ChatWindow() {
  const { selectedRoom, members } = useContext(AppContext);
  console.log(members);
  return (
    <WrapperStyled>
      <HeaderStyled>
        {selectedRoom ? (
          <div className="header__info">
            <p className="header__title">{selectedRoom.name}</p>
            <span className="header__description">
              {selectedRoom.description}
            </span>
          </div>
        ) : (
          <p style={{ padding: "10px", fontStyle: "italic" }}>
            Chưa chọn phòng nào
          </p>
        )}

        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">
            {" "}
            Mời{" "}
          </Button>
          <Avatar.Group size="small" max={{ count: 2 }}>
            {members?.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ""
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message
            text="Test"
            photoURL={null}
            displayName="Tung"
            createdAt={123123123123}
          ></Message>
          <Message
            text="Test1"
            photoURL={null}
            displayName="An"
            createdAt={123123123123}
          ></Message>
          <Message
            text="Test2"
            photoURL={null}
            displayName="Binh"
            createdAt={123123123123}
          ></Message>
          <Message
            text="Test3"
            photoURL={null}
            displayName="Cuong"
            createdAt={123123123123}
          ></Message>
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input placeholder="Nhập tin nhắn ..." autoComplete="off" />
          </Form.Item>
          <Button type="primary"> Gửi </Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
