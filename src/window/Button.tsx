import styled from "styled-components"

type ButtonProp = {
    readonly btnType?: "exit" | "minimize"
    readonly iconSize?: number
    readonly secondary?: boolean
}

const Button = styled.button<ButtonProp>`
    display: inline-flex;
    width: 17px;
    height: 17px;
    border-radius: 17px;
    padding: 0;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    outline: none;

    & > * {
        &:hover {
            color: ${(props) =>
                props.btnType === "exit" ? "#cb2b83" : "#e0e0e0"};
            cursor: pointer;
        }
        font-size: ${(props) =>
            props.iconSize ? `${props.iconSize}px` : "13px"};
        margin: 0;
        padding: 0;
        color: ${(props) => (props.btnType === "exit" ? "#a02669" : "#bfbfbf")};
        font-weight: 600;
        transition: 200ms ease;
        color:  ${(props) => (props.secondary ? "#575757 !important" : "")};
    }
`

export default Button
