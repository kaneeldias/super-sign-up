"use client"

import React from "react";
import {DatePickerInput, DateValue} from "@mantine/dates";

type Props = {
    label: string;
    value: DateValue;
    setValue: (value: DateValue) => void;
    className?: string;
}

export default function DateInput(props: Props) {
    return (
        <DatePickerInput
            className={`w-1/3`}
            label={props.label}
            value={props.value}
            onChange={props.setValue}
        />
    )
}