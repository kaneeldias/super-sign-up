"use client"

import {Button as MantineButton} from "@mantine/core";
import {ReactNode} from "react";

type Props = {
    onClick: () => void;
    disabled: boolean;
    children: ReactNode;
}

export default function Button(props: Props) {
    return (
        <MantineButton color={"blue"} onClick={props.onClick} className={`w-32`} disabled={props.disabled}>
            {props.children}
        </MantineButton>
    )
}