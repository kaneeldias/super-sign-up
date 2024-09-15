import {useState} from "react";
import {WorkExperience as WorkExperienceType} from "@/schemas/cv_info";
import WorkExperience from "@/components/WorkExperience";
import CollapsibleSection from "@/components/Container/CollapsibleSection";

type Props = {
    workExperience: WorkExperienceType[];
    setWorkExperience: (workExperience: WorkExperienceType[]) => void;
}

export default function WorkExperienceList(props: Props) {
    const [workExperience, setWorkExperience] = useState(props.workExperience);

    function updateWorkExperience(index: number) {
        return (experience: any) => {
            const newWorkExperience = [...workExperience];
            newWorkExperience[index] = experience;
            setWorkExperience(newWorkExperience);
        }
    }

    return (
            <CollapsibleSection
                title={"Work Experience"}
            >
                {workExperience.map((experience, index) => (
                    <WorkExperience key={index} experience={experience}
                                    updateExperience={updateWorkExperience(index)}/>
                ))}
            </CollapsibleSection>
    )
}