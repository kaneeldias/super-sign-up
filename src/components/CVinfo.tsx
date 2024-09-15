"use client"

import {CvInfo} from "@/schemas/cv_info";
import React, {useState} from "react";
import WorkExperienceList from "@/components/WorkExperienceList";
import EducationalBackgroundList from "@/components/EducationalBackgroundList";
import ContainerBox from "@/components/Container/ContainerBox";
import ContainerHeader from "@/components/Container/ContainerHeader";
import TextInput from "@/components/Inputs/TextInput";

type Props = {
	cvInfo: CvInfo
}

export default function CVInfo(props: Props) {
	const cvInfo = props.cvInfo;
	const [name, setName] = useState<string>(cvInfo.first_name + " " + cvInfo.last_name);
	const [workExperience, setWorkExperience] = useState(cvInfo.work_experience);
	const [educationalBackground, setEducationalBackground] = useState(cvInfo.educational_background);

	return (
		<ContainerBox borderColor={"border-aiesec-blue"} className={`min-w-[700px]`}>
			<ContainerHeader
				title={"Here is what we could find about you"}
				subtitle={"You can make any corrections if they look wrong"}
			/>

			<div className={`flex flex-col space-y-5`}>
				<TextInput
					label="Name"
					value={name}
					setValue={setName}
				/>

				<WorkExperienceList workExperience={workExperience} setWorkExperience={setWorkExperience}/>
				<EducationalBackgroundList educationalBackground={educationalBackground} setEducationalBackground={setEducationalBackground}/>
			</div>

		</ContainerBox>

	);
}