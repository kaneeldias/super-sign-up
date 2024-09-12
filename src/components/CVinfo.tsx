"use client"

import {CvInfo} from "@/schemas/cv_info";
import React, {useState} from "react";
import {Button, Collapse, TextInput} from "@mantine/core";
import WorkExperience from "@/components/WorkExperience";
import WorkExperienceList from "@/components/WorkExperienceList";
import EducationalBackgroundList from "@/components/EducationalBackgroundList";

type Props = {
	cvInfo: CvInfo
}

export default function CVInfo(props: Props) {
	const cvInfo = props.cvInfo;
	const [name, setName] = useState<string>(cvInfo.name);
	const [workExperience, setWorkExperience] = useState(cvInfo.work_experience);
	const [educationalBackground, setEducationalBackground] = useState(cvInfo.educational_background);

	return (
		<div
			className={`flex bg-bg-dark p-5 rounded-md flex-col min-w-96 w-[600px] space-y-5 border-white border-solid border-b-2`}>
			<div>
				<div className={`text-xl text-light-gray font-bold`}>Here is what we could find about you</div>
				<div className={`text-sm text-light-gray font-light`}>
					You can make any corrections if they look wrong
				</div>
			</div>

			<div className={`flex flex-col space-y-5`}>
				<TextInput
					label="Name"
					value={name}
					onChange={(event) => setName(event.currentTarget.value)}
				/>

				<WorkExperienceList workExperience={workExperience} setWorkExperience={setWorkExperience}/>
				<EducationalBackgroundList educationalBackground={educationalBackground} setEducationalBackground={setEducationalBackground}/>
			</div>

		</div>

	);
}