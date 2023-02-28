import { Avatar, Card, Space, Typography, Button, message } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import { writeText } from "@tauri-apps/api/clipboard"
import key from "../assets/key.png"
import instagram from "../assets/instagram.png"
import yahoo from "../assets/yahoo.png"
import linkedin from "../assets/linkedin.png"
import youtube from "../assets/youtube.png"
import mantra from "../assets/mantra.jpeg"

const Title = (
    <Space size="small" align="center">
        <Avatar size={21} src={key} />
        <Typography.Title style={{ margin: 0 }} level={5}>
            Google Authenticator
        </Typography.Title>
    </Space>
)

export default function About(): JSX.Element {
    const [msg, ctx] = message.useMessage()

    const contacts = [
        {
            text: "instagram.com/zahrulsch",
            image: instagram,
        },
        {
            text: "mantracode@yahoo.com",
            image: yahoo,
        },
        {
            text: "linkedin.com/in/zahrulsch",
            image: linkedin,
        },
        {
            text: "youtube.com/@mantracode",
            image: youtube,
        },
    ].sort((a, b) => b.text.length - a.text.length)

    const copyText = (text: string) => {
        writeText(text).then(() => {
            msg.open({
                key: "text",
                content: "Berhasil Disalin",
                style: {
                    marginTop: "28px",
                },
                type: "info",
                duration: 2,
            })
        })
    }

    return (
        <Card
            title={Title}
            size="small"
            style={{
                width: "100%",
                alignSelf: "start",
                backgroundColor: "rgba(67, 67, 67, 0.24)",
            }}
        >
            {ctx}
            <Space direction="vertical" size="small">
                <Typography.Text type="secondary">
                    Software ini dibuat untuk membantu menyimpan daftar Google
                    Authenticator kode teman-teman dan juga memvalidasinya.
                </Typography.Text>
                <Card
                    style={{ backgroundColor: "rgba(27, 27, 27, 0.27)" }}
                    type="inner"
                    size="small"
                    title="Kreator"
                >
                    <Space
                        style={{ width: "100%", padding: "10px 0" }}
                        align="center"
                        direction="vertical"
                        size={0}
                    >
                        <Avatar size={90} src={mantra}></Avatar>
                        {contacts.map((contact) => (
                            <Space
                                style={{ marginTop: "10px" }}
                                size="small"
                                align="center"
                                key={contact.text}
                            >
                                <Avatar src={contact.image} size={20}></Avatar>
                                <Typography.Text>
                                    {contact.text}
                                </Typography.Text>
                                <Button
                                    size="small"
                                    shape="circle"
                                    icon={
                                        <PaperClipOutlined
                                            style={{ fontSize: "11px" }}
                                        />
                                    }
                                    type="default"
                                    onClick={() => copyText(contact.text)}
                                />
                            </Space>
                        ))}
                    </Space>
                </Card>
            </Space>
        </Card>
    )
}
