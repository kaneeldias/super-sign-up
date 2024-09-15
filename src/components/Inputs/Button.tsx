"use client"

import {Button as MantineButton} from "@mantine/core";
import {ReactNode} from "react";

type Props = {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
    type?: "button" | "submit" | "reset";
}

export default function Button(props: Props) {
    return (
        <MantineButton color={"blue"} onClick={props.onClick} className={`w-32`} disabled={props.disabled} type={props.type}>
            {props.children}
        </MantineButton>
    )
}