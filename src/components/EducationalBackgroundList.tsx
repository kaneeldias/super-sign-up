import {Button, Collapse} from "@mantine/core";
import {useState} from "react";
import {EducationalBackground as EducationalBackgroundType} from "@/schemas/cv_info";
import EducationalBackground from "@/components/EducationalBackground";

type Props = {
    educationalBackground: EducationalBackgroundType[];
    setEducationalBackground: (educationalBackground: EducationalBackgroundType[]) => void;
}

export default function EducationalBackgroundList(props: Props) {
    const [educationalBackground, setEducationalBackground] = useState(props.educationalBackground);
    const [educationalBackgroundOpened, setEducationalBackgroundOpened] = useState(true);

    function updateEducationalBackground(index: number) {
        return (experience: any) => {
            const newEducationalExperience = [...educationalBackground];
            newEducationalExperience[index] = experience;
            setEducationalBackground(newEducationalExperience);
        }
    }

    return (
        <>
            <div className={`flex flex-row justify-between mb-2 space-x-5`}>
                <div className={`text-lg text-green font-bold`}>Educational Background</div>
                <Button size={"xs"} color={"green"} onClick={() => setEducationalBackgroundOpened(!educationalBackgroundOpened)}>
                    {educationalBackgroundOpened ? "Hide" : "Show"}
                </Button>
            </div>
            <Collapse in={educationalBackgroundOpened}>
                <div className={`flex flex-col space-y-5`}>
                    {educationalBackground.map((experience, index) => (
                        <EducationalBackground key={index} experience={experience}
                                        updateExperience={updateEducationalBackground(index)}/>
                    ))}
                </div>
            </Collapse>
        </>

    )
}