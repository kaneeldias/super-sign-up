import {Button, Collapse} from "@mantine/core";
import {useState} from "react";
import {WorkExperience as WorkExperienceType} from "@/schemas/cv_info";
import WorkExperience from "@/components/WorkExperience";

type Props = {
    workExperience: WorkExperienceType[];
    setWorkExperience: (workExperience: WorkExperienceType[]) => void;
}

export default function WorkExperienceList(props: Props) {
    const [workExperience, setWorkExperience] = useState(props.workExperience);
    const [workExperienceOpened, setWorkExperienceOpened] = useState(true);

    function updateWorkExperience(index: number) {
        return (experience: any) => {
            const newWorkExperience = [...workExperience];
            newWorkExperience[index] = experience;
            setWorkExperience(newWorkExperience);
        }
    }

    return (
        <>
            <div className={`flex flex-row justify-between mb-2 space-x-5`}>
                <div className={`text-lg text-yellow font-bold`}>Work Experience</div>
                <Button size={"xs"} color={"yellow"} onClick={() => setWorkExperienceOpened(!workExperienceOpened)}>
                    {workExperienceOpened ? "Hide" : "Show"}
                </Button>
            </div>
            <Collapse in={workExperienceOpened}>
                <div className={`flex flex-col space-y-5`}>
                    {workExperience.map((experience, index) => (
                        <WorkExperience key={index} experience={experience}
                                        updateExperience={updateWorkExperience(index)}/>
                    ))}
                </div>
            </Collapse>
        </>

    )
}