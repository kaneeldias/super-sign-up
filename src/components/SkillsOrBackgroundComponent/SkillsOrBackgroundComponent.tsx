import React from "react";

type Props = {
    type: "skills" | "backgrounds";
    items: string[];
    setItems: (items: string[]) => void;
}

export default function SkillsOrBackgroundComponent(props: Props) {
    return (
        <div className={`flex flex-col space-y-2`}>
            <div className={`font-bold text-sm`}>{`These are what we think your ${props.type} may be`}</div>
            <div className={`flex flex-row flex-wrap gap-3`}>
                {props.items.map((item: string, index: number) => (
                    <div key={index}
                         className={`bg-light-gray rounded-full px-3 text-xs py-1`}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
