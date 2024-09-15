"use client"

import {Button, FileButton, FileInput as MantineFileInput} from "@mantine/core";
import {IconFileCv} from "@tabler/icons-react";
import {rem} from "@mantine/core";

const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

type Props = {
    file: File | null;
    setFile: (file: File | null) => void;
}

export default function FileInput(props: Props) {
    return (
        <>
            <MantineFileInput
                leftSection={icon}
                placeholder="Your CV"
                leftSectionPointerEvents="none"
                value={props.file ? props.file : null}
                onChange={props.setFile}
                accept={"application/pdf"}
            />


            {!props.file &&
                <FileButton onChange={props.setFile} accept="pdf">
                    {(props) => <Button {...props} color={"yellow"}>Upload resume</Button>}
                </FileButton>
            }
        </>
    )
}