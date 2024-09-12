import {Button, FileButton, FileInput, Loader, rem} from "@mantine/core";
import Image from "next/image";
import {IconFileCv} from "@tabler/icons-react";
import {useState} from "react";
import {CvInfo} from "@/schemas/cv_info";

const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

type Props = {
    setCvInfo: (cvInfo: CvInfo) => void;
}

export default function CVUpload(props: Props) {
    const [file, setFile] = useState<File | null>(null);
    const borderColor = file ? "border-aiesec-blue" : "border-yellow";
    const [loading, setLoading] = useState(false);

    async function evaluateCV() {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file!);

        await fetch("/api/cv/evaluate", {
            method: "POST",
            body: formData
        }).then(async res => {
            setLoading(false);
            const data = (await res.json()).data as CvInfo;
            props.setCvInfo(data);
        });
    }

    return (
        <div className={`bg-bg-dark p-5 rounded-md flex-row min-w-96 space-y-5 ${borderColor} border-solid border-b-2`}>
            <div>
                <div className={`text-xl font-bold text-light-gray`}>Upload your resume</div>
                <div className={`text-sm text-light-gray font-light`}>
                    Get free personalized inputs and search for opportunities that suit you
                </div>
            </div>
            <div>
                <FileInput
                    leftSection={icon}
                    placeholder="Your CV"
                    leftSectionPointerEvents="none"
                    value={file ? file : null}
                    onChange={setFile}
                    accept={"application/pdf"}
                />
            </div>

            {!file &&
                <FileButton onChange={setFile} accept="pdf">
                    {(props) => <Button {...props} color={"yellow"}>Upload resume</Button>}
                </FileButton>
            }

            {file &&
                <Button color={"blue"} onClick={evaluateCV} className={`w-32`} disabled={loading}>

                    {loading ? <Loader color="blue" size={"sm"}/> : "Evaluate CV"}
                </Button>
            }

            <Image src={"/aiesec-logo-black.png"} alt={"AIESEC Logo"} width={200} height={100}
                   className={`-ml-1 pt-10`}/>
        </div>

    )
}