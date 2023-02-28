import { Spin } from "antd"
import { CSSProperties } from "styled-components"

export default function Loading(props: { style?: CSSProperties }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                ...props.style,
            }}
        >
            <Spin size="small" />
        </div>
    )
}
