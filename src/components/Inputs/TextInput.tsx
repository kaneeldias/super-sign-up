"use client"

import {TextInput as MantineTextInput} from "@mantine/core";
import React from "react";

type Props = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    className?: string;
    type?: "text" | "email" | "tel" | "password";
    errors?: string[];
    disabled?: boolean;
    setIsDirty?: () => void;
}

export default function TextInput(props: Props) {
    return (
        <MantineTextInput
            className={props.className}
            label={props.label}
            value={props.value}
            onChange={(event) => {
                props.setValue(event.currentTarget.value);
                if (props.setIsDirty) {
                    props.setIsDirty();
                }
            }}
            type={props.type}
            error={props.errors ? props.errors[0] : null}
            disabled={props.disabled}
        />

    )
}