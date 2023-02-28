import { Button, Tag, Result, Space, Collapse, Typography, Divider } from "antd"
import { Link } from "react-router-dom"
import sendQuery from "../ipc/sendQuery"
import Ifrender from "../components/Ifrender"
import Loading from "../components/Loading"

export default function Home(): JSX.Element {
    const { data, pending } = sendQuery(
        "get_profiles",
        {},
        {
            activeOnInitial: true,
        }
    )
    return (
        <Ifrender condition={data === null && pending}>
            <Loading
                style={{
                    width: "100%",
                    minHeight: "450px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <Ifrender condition={data !== null && data.items.length > 0}>
                <Space
                    style={{ width: "100%", height: "max-content" }}
                    direction="vertical"
                    size="small"
                >
                    <Collapse size="small" accordion>
                        {data &&
                            data.items.map((item) => (
                                <Collapse.Panel
                                    header={item.name}
                                    key={item.id}
                                >
                                    <Space direction="vertical" size={1}>
                                        <Space size={1} direction="vertical">
                                            <Typography.Title
                                                type="warning"
                                                level={5}
                                                style={{ margin: 0 }}
                                            >
                                                Authentication Code
                                            </Typography.Title>
                                            <Typography.Text type="secondary">
                                                {item.auth_code}
                                            </Typography.Text>
                                        </Space>
                                        <Divider style={{ margin: "7px 0" }} />
                                        <Space size={4} direction="vertical">
                                            <Typography.Title
                                                type="success"
                                                level={5}
                                                style={{ margin: 0 }}
                                            >
                                                Token
                                            </Typography.Title>
                                            <Tag
                                                style={{
                                                    fontSize: "18px",
                                                    padding: "8px",
                                                }}
                                            >
                                                098765
                                            </Tag>
                                        </Space>
                                    </Space>
                                </Collapse.Panel>
                            ))}
                    </Collapse>
                </Space>

                <Result
                    style={{ alignSelf: "center" }}
                    status="info"
                    title="Daftar Kosong"
                    subTitle="Belum ada daftar profile authenticator silahkan tambahkan!"
                    extra={[
                        <Link key={123} to="/addprofile">
                            <Button type="primary">Tambah</Button>
                        </Link>,
                    ]}
                ></Result>
            </Ifrender>
        </Ifrender>
    )
}
