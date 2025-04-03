import React from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

const PanelContentStyled = styled.div`
  .ant-collapse-header,
  p {
    color: white;
  }

  .ant-collapse-content-box {
    padding: 0 40px;
  }

  .add-room {
    color: white;
    padding: 0;
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
    const { rooms } = React.useContext(AppContext);
    console.log(rooms);
  return (
    <Collapse
      ghost
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: (
            <Typography.Text style={{ color: "white" }}>
              Danh sách các phòng
            </Typography.Text>
          ),
          children: (
            <PanelContentStyled>
              {
                rooms.map(room => <LinkStyled key={room.id}>{room.name}</LinkStyled> )
              }
              <Button
                type="text"
                icon={<PlusSquareOutlined />}
                className="add-room"
              >
                {" "}
                Thêm phòng{" "}
              </Button>
            </PanelContentStyled>
          ),
        },
      ]}
    />
  );
}
