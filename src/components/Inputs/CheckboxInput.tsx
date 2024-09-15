"use client"

import {Checkbox} from "@mantine/core";
import React, {ReactNode} from "react";

type Props = {
    label: string | ReactNode;
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

export default function CheckboxInput(props: Props) {
    return (
        <Checkbox
            checked={props.checked}
            onChange={(event) => props.setChecked(event.currentTarget.checked)}
            label={props.label}
        />

    )
}