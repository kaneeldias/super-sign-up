import React from "react";

type Props = {
    children: React.ReactNode;
    color?: string;
}

export default function MiniBoxTitle(props: Props) {
    let bgColor = getBgColor(props.color);

    return (
        <div className={`font-bold text-sm ${bgColor} rounded-r-md -mt-3 -ml-3 px-2 bg-opacity-20`}>
            {props.children}
        </div>
    )
}

function getBgColor(color: string | undefined): string {
    switch (color) {
        case "green":
            return "bg-[#16453e]";
        case "yellow":
            return "bg-[#a6915c]";
        default:
            return "bg-aiesec-blue";
    }
}