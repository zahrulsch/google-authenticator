type Childrens = JSX.Element

interface IfrenderProps {
    children: [Childrens, Childrens]
    condition?: boolean | null
}

export default function Ifrender(props: IfrenderProps) {
    if (props.condition) return props.children[0]
    return props.children[1]
}
