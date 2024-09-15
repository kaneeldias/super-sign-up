import React, {ReactNode, useState} from "react";
import {Button, Collapse} from "@mantine/core";

type Props = {
    title: string;
    children: ReactNode;
    color: "yellow" | "green";
}

export default function CollapsibleSection(props: Props) {
    let textColor = getTextColor(props.color);
    let buttonColor = getButtonColor(props.color);

    const [opened, setOpened] = useState(true);

    return (
        <>
            <div className={`flex flex-row justify-between mb-2 space-x-5`}>
                <div className={`text-lg ${textColor} font-bold`}>{props.title}</div>
                <Button size={"xs"} color={buttonColor} onClick={() => setOpened(!opened)}>
                    {opened ? "Hide" : "Show"}
                </Button>
            </div>
            <Collapse in={opened}>
                <div className={`flex flex-col space-y-5`}>
                    {props.children}
                </div>
            </Collapse>
        </>
    )
}

function getTextColor(color: string): string {
    switch (color) {
        case "green":
            return "text-green";
        case "yellow":
            return "text-yellow";
        default:
            return "text-aiesec-blue";
    }
}

function getButtonColor(color: string): string {
    switch (color) {
        case "green":
            return "green";
        case "yellow":
            return "yellow";
        default:
            return "aiesec-blue";
    }
}