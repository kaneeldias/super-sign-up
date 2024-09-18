import React from "react";
import {Tooltip} from "@mantine/core";

type Props = {
    type: "skill" | "background";
    value: string,
    highlighted: boolean,
    add: () => void,
    remove: () => void,
    selected?: boolean
}

export default function SkillsOrBackgroundChip(props: Props) {
    const bgColor = props.highlighted ? "bg-aiesec-blue" : "bg-[#DDDDDD]";
    const textColor = props.highlighted ? "text-white" : "text-bg-dark";

    return (
        <div className={`flex flex-row space-x-2 ${bgColor} ${textColor} rounded-full pl-3 pr-1 text-xs py-1`}>
            <div>{props.value}</div>
            { props.selected &&
                <Tooltip __size={"xs"} label={`Remove ${props.value} as ${props.type}`} position={"top"} withArrow>
                    <div className={`cursor-pointer bg-white bg-opacity-20 rounded-full w-4 items-center justify-center text-center hover:bg-opacity-40 transition-all`} onClick={props.remove}>-</div>
                </Tooltip>
            }

            { !props.selected &&
                <Tooltip __size={"xs"} label={`Add ${props.value} as ${props.type}`} position={"top"} withArrow>
                    <div className={`cursor-pointer bg-black bg-opacity-20 rounded-full w-4 items-center justify-center text-center hover:bg-opacity-40 transition-all`} onClick={props.add}>+</div>
                </Tooltip>
            }
        </div>
        )
}
