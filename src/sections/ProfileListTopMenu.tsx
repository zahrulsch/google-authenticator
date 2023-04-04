import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    column-gap: 7px;
    width: 100%;
`;

export interface ProfileListTopMenuProp {
    nameQuery?: string;
    onChangeNameQuery?: (v: string) => void;
}

export default function ProfileListTopMenu(
    props: ProfileListTopMenuProp
): JSX.Element {
    return (
        <Flex>
            <Input
                value={props.nameQuery}
                onChange={(e) => {
                    props.onChangeNameQuery?.(e.target.value);
                }}
                style={{ flex: 2 }}
                placeholder="Nama profile"
                allowClear
                spellCheck={false}
            />
            <Link to="/addprofile">
                <Button style={{ flex: 1 }} block type="primary">
                    Tambah
                </Button>
            </Link>
        </Flex>
    );
}
