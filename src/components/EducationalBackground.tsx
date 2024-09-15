import {EducationalBackground as EducationalBackgroundType} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import MiniBox from "@/components/Mini/MiniBox";
import MiniBoxTitle from "@/components/Mini/MiniBoxTitle";
import TextInput from "@/components/Inputs/TextInput";
import DateInput from "@/components/Inputs/DateInput";

type Props = {
	experience: EducationalBackgroundType
	updateExperience: (experience: EducationalBackgroundType) => void
}

export default function EducationalBackground(props: Props) {
	const [institution, setInstitution] = useState<string>(props.experience.institution);
	const [area, setArea] = useState<string>(props.experience.area);
	const [study_type, setStudyType] = useState<string>(props.experience.study_type);
	const [start_date, setStartDate] = useState<Date | null>(new Date(props.experience.start_date!));
	const [end_date, setEndDate] = useState<Date | null>(new Date(props.experience.end_date!));
	const [location, setLocation] = useState<string>(props.experience.location);

	useEffect(() => {
		props.updateExperience({institution, area, study_type, start_date, end_date, location});
	}, [institution, area, study_type, start_date, end_date, location]);

	return (
		<MiniBox borderColor={"border-green"}>
			<MiniBoxTitle color={"green"}>{institution}</MiniBoxTitle>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Institution" value={institution} className={`w-full`}
						   setValue={setInstitution}/>
			</div>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Area" value={area} className={`w-full`}
						   setValue={setArea}/>
				<TextInput label="Study type" value={area} className={`w-full`}
						   setValue={setStudyType}/>
			</div>

			<div className={`flex flex-row space-x-5`}>
				<DateInput
					className={`w-1/3`}
					label="Start date"
					value={start_date}
					setValue={setStartDate}
				/>
				<DateInput
					className={`w-1/3`}
					label="End date"
					value={end_date}
					setValue={setEndDate}
				/>
				<TextInput label="Location" value={location}
						   className={`w-1/3`}
						   setValue={setLocation}
				/>
			</div>
		</MiniBox>
	);
}