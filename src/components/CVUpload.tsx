import Image from "next/image";
import {useState} from "react";
import {CvInfo} from "@/schemas/cv_info";
import ContainerBox from "@/components/Container/ContainerBox";
import FileInput from "@/components/Inputs/FileInput";
import ContainerHeader from "@/components/Container/ContainerHeader";
import Button from "@/components/Inputs/Button";
import EvaluatingCVLoader from "@/components/EvaluatingCVLoader";
import {AnimatePresence, motion} from "framer-motion";

const EVALUATE_ENDPOINT = "/api/cv/evaluate";
const ANIMATIONS =  {
    initial: {opacity: 0 },
    animate: {opacity: 1, transition: { delay: 0 }},
    exit: {opacity: 0 }
}

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

        await fetch(EVALUATE_ENDPOINT, {
            method: "POST",
            body: formData
        }).then(async res => {
            const data = (await res.json()).data as CvInfo;
            props.setCvInfo(data);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <AnimatePresence mode="wait">
            {!loading &&
                <motion.div
                    key={1}
                    initial={ANIMATIONS.initial}
                    animate={ANIMATIONS.animate}
                    exit={ANIMATIONS.exit}
                >
                    <ContainerBox borderColor={borderColor}>
                    <ContainerHeader
                        title={"Upload your CV"}
                        subtitle={"Get free personalized inputs and search for opportunities that suit you"}
                            />

                            <FileInput file={file} setFile={setFile}/>

                            {file &&
                                <Button onClick={evaluateCV} disabled={loading}>Evaluate resume</Button>
                            }
                    </ContainerBox>
                </motion.div>
            }


            {loading &&
                <motion.div
                    key={2}
                    initial={ANIMATIONS.initial}
                    animate={ANIMATIONS.animate}
                    exit={ANIMATIONS.exit}
                >
                    <EvaluatingCVLoader/>
                </motion.div>
            }
        </AnimatePresence>


    )
}