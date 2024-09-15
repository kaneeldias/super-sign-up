import React from "react";
import ContainerTitle from "@/components/Container/ContainerTitle";
import ContainerSubTitle from "@/components/Container/ContainerSubTitle";

type Props = {
    title: string,
    subtitle: string
}

export default function ContainerHeader(props: Props) {
    return (
        <div>
            <ContainerTitle>{props.title}</ContainerTitle>
            <ContainerSubTitle>
                {props.subtitle}
            </ContainerSubTitle>
        </div>
    )
}