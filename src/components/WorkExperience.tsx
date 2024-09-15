import {WorkExperience as WorkExperienceType} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import {DatePickerInput} from "@mantine/dates";
import MiniBox from "@/components/Mini/MiniBox";
import MiniBoxTitle from "@/components/Mini/MiniBoxTitle";
import TextInput from "@/components/Inputs/TextInput";
import DateInput from "@/components/Inputs/DateInput";

type Props = {
	experience: WorkExperienceType
	updateExperience: (experience: WorkExperienceType) => void
}

export default function WorkExperience(props: Props) {
	const [position, setPosition] = useState<string>(props.experience.position);
	const [company, setCompany] = useState<string>(props.experience.company);
	const [start_date, setStartDate] = useState<Date | null>(new Date(props.experience.start_date!));
	const [end_date, setEndDate] = useState<Date | null>(new Date(props.experience.end_date!));
	const [location, setLocation] = useState<string>(props.experience.location);

	useEffect(() => {
		props.updateExperience({position, company, start_date, end_date, location});
	}, [position, company, start_date, end_date, location]);

	return (
		<MiniBox borderColor={`border-yellow`}>
			<MiniBoxTitle color={"yellow"}>{position} at {company}</MiniBoxTitle>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Company" value={company} className={`w-1/2`} setValue={setCompany}/>
				<TextInput label="Position" value={position} className={`w-1/2`} setValue={setPosition}/>
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
				<TextInput label="Location" value={location} className={`w-1/3`} setValue={setLocation}/>
			</div>
		</MiniBox>
	);
}