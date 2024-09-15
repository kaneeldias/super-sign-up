import React from "react";

type Props = {
    children: React.ReactNode;
}

export default function ContainerSubTitle(props: Props) {
    return (
        <div className={`text-sm text-light-gray font-light`}>
            {props.children}
        </div>
    )
}