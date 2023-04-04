import { Card, Space, Input, Button, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import sendQuery from "../ipc/sendQuery";

const Title = () => {
    const navigate = useNavigate();

    return (
        <Space align="center" size="small">
            <Button
                type="text"
                size="small"
                icon={<ArrowLeftOutlined style={{ fontSize: "11px" }} />}
                onClick={() => navigate(-1)}
            ></Button>
            <Typography.Title style={{ margin: 0 }} level={5}>
                Tambahkan Profile
            </Typography.Title>
        </Space>
    );
};

const AddProfile = () => {
    const navigate = useNavigate();
    const [msg, ctx] = message.useMessage();
    const { fn } = sendQuery("add_profile", null, {
        onSuccess() {
            msg.success({
                content: "Berhasil",
                key: "success",
                style: {
                    marginTop: "28px",
                },
            });
            navigate(-1);
        },
        onError(e) {
            msg.error({
                key: "error",
                content: e.cause,
                style: {
                    marginTop: "28px",
                },
            });
        },
    });
    const [payload, setPayload] = useState({
        name: "",
        authCode: "",
    });

    const sendIpc = () => {
        fn({ ...payload });
    };

    return (
        <Card
            size="small"
            style={{
                width: "100%",
                alignSelf: "start",
                backgroundColor: "rgba(67, 67, 67, 0.24)",
            }}
            title={<Title />}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                {ctx}
                <Input
                    value={payload.name}
                    onChange={(e) => {
                        setPayload((p) => ({
                            ...p,
                            name: e.target.value,
                        }));
                    }}
                    allowClear
                    spellCheck={false}
                    placeholder="Nama profile"
                />
                <Input
                    value={payload.authCode}
                    spellCheck={false}
                    onChange={(e) => {
                        setPayload((p) => ({
                            ...p,
                            authCode: e.target.value,
                        }));
                    }}
                    allowClear
                    placeholder="Authenticator Code"
                />
                <Button onClick={sendIpc} type="primary" block>
                    Tambahkan
                </Button>
                <Card
                    style={{ backgroundColor: "rgba(27, 27, 27, 0.27)" }}
                    size="small"
                    type="inner"
                    title="Perhatian!"
                >
                    <Typography.Text>
                        Cek kembali pastikan kode yang kamu masukkan sudah benar
                        😁
                    </Typography.Text>
                </Card>
            </Space>
        </Card>
    );
};

export default AddProfile;
