import {useState} from "react";
import {CvInfo} from "@/schemas/cv_info";
import ContainerBox from "@/components/Container/ContainerBox";
import FileInput from "@/components/Inputs/FileInput";
import ContainerHeader from "@/components/Container/ContainerHeader";
import Button from "@/components/Inputs/Button";
import EvaluatingCVLoader from "@/components/Loaders/EvaluatingCVLoader";
import {AnimatePresence, motion} from "framer-motion";

const EVALUATE_ENDPOINT = "/api/cv/evaluate";
const ANIMATIONS =  {
    initial: {opacity: 0 },
    animate: {opacity: 1, transition: { delay: 0 }},
    exit: {opacity: 0 }
}

type Props = {
    setCvInfo: (cvInfo: CvInfo) => void;
    cvFile: File | null;
    setCvFile: (file: File | null) => void;
}

export default function CVUpload(props: Props) {
    const borderColor = props.cvFile ? "border-aiesec-blue" : "border-yellow";
    const [loading, setLoading] = useState(false);

    async function evaluateCV() {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", props.cvFile!);

        await fetch(EVALUATE_ENDPOINT, {
            method: "POST",
            body: formData
        }).then(async res => {
            const data = (await res.json());
            props.setCvInfo(data.data);
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

                            <FileInput file={props.cvFile} setFile={props.setCvFile}/>

                            {props.cvFile &&
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