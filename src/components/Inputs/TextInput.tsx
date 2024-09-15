"use client"

import {TextInput as MantineTextInput} from "@mantine/core";
import React, {HTMLInputTypeAttribute} from "react";

type Props = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    className?: string;
    type?: HTMLInputTypeAttribute | undefined;
}

export default function TextInput(props: Props) {
    return (
        <MantineTextInput
            type={props.type}
            className={props.className}
            label={props.label}
            value={props.value}
            onChange={(event) => props.setValue(event.currentTarget.value)}
        />

    )
}