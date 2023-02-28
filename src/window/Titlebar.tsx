import styled from "styled-components"
import { Typography, Popover, Divider } from "antd"
import {
    CloseCircleFilled,
    MinusCircleFilled,
    MenuOutlined,
    HomeFilled,
    ArrowLeftOutlined,
    InfoCircleFilled,
} from "@ant-design/icons"
import { appWindow } from "@tauri-apps/api/window"
import { CSSProperties, PropsWithChildren, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import Menuitem from "./Menuitem"

type TitlebarProp = {
    readonly style?: CSSProperties
}

export default function Titlebar(props: PropsWithChildren & TitlebarProp) {
    const [open, setOpen] = useState(false)

    return (
        <Container
            onContextMenu={(e) => e.preventDefault()}
            style={props.style}
            data-tauri-drag-region
        >
            <Popover
                placement="bottomLeft"
                content={<Menulist onclick={() => setOpen(false)} />}
                trigger="click"
                style={{ padding: 0 }}
                arrow={!1}
                open={open}
                onOpenChange={(v) => setOpen(v)}
            >
                <Button iconSize={11}>
                    <MenuOutlined />
                </Button>
            </Popover>
            <Typography.Text className="title-header" data-tauri-drag-region>
                Google Authenticator
            </Typography.Text>
            <Button onClick={() => appWindow.minimize()}>
                <MinusCircleFilled />
            </Button>
            <Button onClick={() => appWindow.close()} btnType="exit">
                <CloseCircleFilled />
            </Button>
        </Container>
    )
}

const Menulist = (props?: { onclick?: () => void }) => {
   const nav = useNavigate()

    const navigate = (href: string | number) => {
        props?.onclick?.()
        if (typeof href === "string") {
            nav(href)
        } else if (typeof href === "number" && href === -1) {
            nav(-1)
        }
    }

    return (
        <div
            style={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
            }}
        >
            <Menuitem onClick={() => navigate("/")} active>
                <HomeFilled /> Layar Utama
            </Menuitem>
            <Menuitem
                onClick={() => navigate(-1)}
                active
            >
                <ArrowLeftOutlined />
                Kembali
            </Menuitem>
            <Divider style={{ margin: 0, backgroundColor: "#141414" }} plain />
            <Menuitem onClick={() => navigate("/about")} active>
                <InfoCircleFilled />
                Info Aplikasi
            </Menuitem>
        </div>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 6px 10px;
    align-items: center;
    box-sizing: border-box;
    column-gap: 2px;
    background-color: rgba(38, 38, 38, 0.5);
    border-bottom: 1px solid #262626;

    & > .title-header {
        user-select: none;
        flex: 1;
        text-align: center;
        font-weight: 600;
    }
`
