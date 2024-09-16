import React from "react";

type Props = {
    value: string,
    highlighted: boolean
}

export default function SkillsOrBackgroundChip(props: Props) {
    const bgColor = props.highlighted ? "bg-aiesec-blue" : "bg-[#DDDDDD]";
    const textColor = props.highlighted ? "text-white" : "text-bg-dark";

    return (
        <div className={`${bgColor} ${textColor} rounded-full px-3 text-xs py-1`}>
            {props.value}
        </div>
        )
}
