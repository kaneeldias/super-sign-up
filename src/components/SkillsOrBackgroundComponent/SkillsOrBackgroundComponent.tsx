import React from "react";
import {Tooltip} from "@mantine/core";

type Props = {
    type: "skills" | "backgrounds" | "nationalities";
    items: string[];
    setItems: (items: string[]) => void;
}

export default function SkillsOrBackgroundComponent(props: Props) {
    function removeItem(item: string) {
        props.setItems(props.items.filter(i => i !== item));
    }

    function addItem(item: string) {
        props.setItems([item, ...props.items]);
    }

    return (
        <>
        { props.items && <div className={`flex flex-col space-y-2`}>
            <div className={`font-bold text-sm`}>{`These are what we think your ${props.type} may be`}</div>
            <div className={`flex flex-row flex-wrap gap-3`}>
                {props.items.map((item: string, index: number) => (
                    <div key={index}
                         className={`flex flex-row bg-light-gray rounded-full pl-3 pr-1 text-xs py-1 space-x-2`}>
                        <div>
                            {item}
                        </div>
                        <Tooltip __size={"xs"} label={`Remove ${item}`} position={"top"} withArrow>
                            <div className={`cursor-pointer bg-bg-dark bg-opacity-20 rounded-full w-4 items-center justify-center text-center hover:bg-opacity-40 transition-all`} onClick={removeItem.bind(null, item)}>-</div>
                        </Tooltip>

                    </div>
                ))}
            </div>
        </div>}
        </>
    )
}
