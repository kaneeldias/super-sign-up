import {useState} from "react";
import {EducationalBackground as EducationalBackgroundType} from "@/schemas/cv_info";
import EducationalBackground from "@/components/EducationalBackground";
import CollapsibleSection from "@/components/Container/CollapsibleSection";

type Props = {
    educationalBackground: EducationalBackgroundType[];
    setEducationalBackground: (educationalBackground: EducationalBackgroundType[]) => void;
}

export default function EducationalBackgroundList(props: Props) {
    const [educationalBackground, setEducationalBackground] = useState(props.educationalBackground);

    function updateEducationalBackground(index: number) {
        return (experience: any) => {
            const newEducationalExperience = [...educationalBackground];
            newEducationalExperience[index] = experience;
            setEducationalBackground(newEducationalExperience);
        }
    }

    return (
        <>
            <CollapsibleSection
                title={"Educational Background"}
                color={"green"}
            >
                {educationalBackground.map((experience, index) => (
                    <EducationalBackground key={index} experience={experience}
                                           updateExperience={updateEducationalBackground(index)}/>
                ))}
            </CollapsibleSection>
        </>

    )
}