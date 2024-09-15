"use client"

import {Select as MantineSelect} from "@mantine/core";

type Props = {
    label: string;
    value: string | null;
    setValue: (value: string | null) => void;
    searchable?: boolean;
    data: {value: string, label: string}[] | undefined;
}

export default function SelectInput(props: Props) {
    return (
        <MantineSelect
            label={props.label}
            data={props.data}
            onChange={props.setValue}
            value={props.value}
            searchable={props.searchable}
            disabled={props.data === undefined}
        />
    )
}