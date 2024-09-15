import React from "react";

type Props = {
    children: React.ReactNode;
}

export default function ContainerTitle(props: Props) {

    return (
        <div className={`text-xl font-bold text-aiesec-blue`}>{props.children}</div>
    )
}