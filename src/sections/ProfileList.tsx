import { CopyOutlined, DeleteFilled, ReloadOutlined } from "@ant-design/icons";
import { writeText } from "@tauri-apps/api/clipboard";
import {
    Space,
    Collapse,
    Typography,
    Divider,
    Tag,
    Tooltip,
    Button,
    message,
    Result,
    Pagination,
    Modal,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ifrender from "../components/Ifrender";
import sendQuery, { Ipc } from "../ipc/sendQuery";
import ProfileListTopMenu from "./ProfileListTopMenu";

type Query = {
    name: string;
    page: number;
};

export interface ProfileListProp {
    readonly data: Ipc["get_profiles"]["response"] | null;
    readonly query: Query;
    onChangeQuery?: (query: Query) => void;
    onRefresh?: () => void;
}

export default function ProfileList(props: ProfileListProp): JSX.Element {
    const [modal, ctx] = Modal.useModal();

    const showConfirm = (id: number) => {
        modal.confirm({
            title: "Apa kamu yakin ingin menghapus profile ini?",
            centered: true,
            icon: <></>,
            maskClosable: true,
            onOk() {
                delete_profile({ id });
            },
            bodyStyle: {
                padding: 20,
            },
            okText: "Hapus",
            cancelText: "Batal",
        });
    };

    const [msg, ctxMsg] = message.useMessage();
    const [id, setId] = useState<number | null>(null);
    const [token, setToken] = useState<string>("99999");

    const { fn: delete_profile } = sendQuery("delete_profile", null, {
        onSuccess() {
            props.onRefresh?.();
        },
        onError() {
            msg.error({
                content: "Gagal hapus profile!",
                style: {
                    marginTop: "29px",
                },
                duration: 1
            })
        },
    });

    const { fn: getToken } = sendQuery("get_token", null, {
        onSuccess(data) {
            setToken(data.token);
        },
        onError(e) {
            msg.error({
                content: e.cause,
                style: {
                    marginTop: "29px",
                },
            });
        },
    });

    const onChangeCollapse = (id: string | string[]) => {
        try {
            if (typeof id === "string") {
                let idN = parseInt(id);

                setId(idN);
            } else {
                let [first] = id;
                let idN = parseInt(first);

                setId(idN);
            }
        } catch {
            msg.error({
                content: "Gagal meminta token",
                style: {
                    marginTop: "29px",
                },
            });
        }
    };

    const copyToken = () => {
        writeText(token).then(() =>
            msg.success({
                content: "Berhasil disalin",
                style: {
                    marginTop: "29px",
                },
                duration: 0.5,
            })
        );
    };

    const reloadToken = () => {
        if (id) {
            setToken("_____");
            getToken({ id });
        }
    };

    useEffect(() => {
        if (id) {
            setToken("_____");
            getToken({ id });
        }
    }, [id]);

    return (
        <Space
            style={{ width: "100%", height: "max-content" }}
            direction="vertical"
            size="small"
        >
            {ctx}
            {ctxMsg}
            <Ifrender
                condition={props.data?.items.length === 0 && !props.query.name}
            >
                <></>
                <ProfileListTopMenu
                    nameQuery={props.query.name}
                    onChangeNameQuery={(name) =>
                        props.onChangeQuery?.({ ...props.query, name })
                    }
                />
            </Ifrender>
            <Ifrender
                condition={props.data?.items.length === 0 && !props.query.name}
            >
                <></>
                <Divider style={{ margin: "1px 0" }} />
            </Ifrender>
            <Ifrender
                condition={props.data?.items.length === 0 && !props.query.name}
            >
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
                <Ifrender condition={props.data?.items.length === 0}>
                    <Result
                        title="Data kosong"
                        subTitle="Record tidak ditemukan"
                        status="warning"
                    ></Result>
                    <Space style={{ width: "100%" }} direction="vertical">
                        <Collapse
                            size="small"
                            onChange={onChangeCollapse}
                            style={{ width: "100%" }}
                            accordion
                        >
                            {props.data &&
                                props.data.items.map((item) => (
                                    <Collapse.Panel
                                        header={item.name}
                                        key={item.id}
                                        extra={
                                            <Button
                                                onClick={() =>
                                                    showConfirm(item.id)
                                                }
                                                icon={
                                                    <DeleteFilled
                                                        style={{
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                }
                                                type="text"
                                                size="small"
                                                danger
                                            ></Button>
                                        }
                                    >
                                        <Space direction="vertical" size={1}>
                                            <Space
                                                size={1}
                                                direction="vertical"
                                            >
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
                                            <Divider
                                                style={{ margin: "7px 0" }}
                                            />
                                            {id === item.id && (
                                                <Space
                                                    size={4}
                                                    direction="vertical"
                                                >
                                                    <Typography.Title
                                                        type="success"
                                                        level={5}
                                                        style={{ margin: 0 }}
                                                    >
                                                        Token
                                                    </Typography.Title>
                                                    <Space
                                                        align="center"
                                                        size="small"
                                                    >
                                                        <Tag
                                                            style={{
                                                                fontSize:
                                                                    "15px",
                                                                padding:
                                                                    "6px 10px",
                                                                margin: 0,
                                                            }}
                                                        >
                                                            {token}
                                                        </Tag>
                                                        <Tooltip
                                                            placement="bottom"
                                                            title="Salin"
                                                        >
                                                            <Button
                                                                onClick={
                                                                    copyToken
                                                                }
                                                                icon={
                                                                    <CopyOutlined />
                                                                }
                                                                size="middle"
                                                            ></Button>
                                                        </Tooltip>
                                                        <Tooltip
                                                            placement="bottom"
                                                            title="Perbarui"
                                                        >
                                                            <Button
                                                                onClick={
                                                                    reloadToken
                                                                }
                                                                icon={
                                                                    <ReloadOutlined />
                                                                }
                                                                size="middle"
                                                            ></Button>
                                                        </Tooltip>
                                                    </Space>
                                                </Space>
                                            )}
                                        </Space>
                                    </Collapse.Panel>
                                ))}
                        </Collapse>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Pagination
                                simple
                                total={props.data?.count}
                                onChange={(page) =>
                                    props.onChangeQuery?.({
                                        ...props.query,
                                        page,
                                    })
                                }
                                current={props.query.page}
                                pageSize={10}
                                size="small"
                                style={{ alignSelf: "center" }}
                            />
                        </div>
                    </Space>
                </Ifrender>
            </Ifrender>
        </Space>
    );
}
