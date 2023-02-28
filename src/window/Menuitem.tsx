import styled, { css } from "styled-components"

type MenuitemProp = {
    readonly children?: any
    readonly active?: boolean
    readonly onClick?: () => void
}

const Menuitem = styled.div<MenuitemProp>`
    display: inline-flex;
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: 150ms ease;
    font-size: 12.4px;
    column-gap: 9px;
    align-items: center;
    ${(props) =>
        !props.active &&
        css`
            color: #7e7e7e;
        `}

    &:hover {
        background-color: rgb(29, 29, 29);
    }

    & svg {
        font-size: 11px;
    }
`
export default Menuitem
