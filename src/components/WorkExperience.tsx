import {TextInput} from "@mantine/core";
import {WorkExperience as WorkExperienceType} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import {DatePickerInput} from "@mantine/dates";

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
		<div className={`flex flex-col space-y-2 bg-black bg-opacity-30 rounded-r-md p-3 border-yellow border-l-4 border-solid`}>
			<div className={`font-bold text-sm bg-yellow rounded-r-md -mt-3 -ml-3 px-2 bg-opacity-20`}>{position} at {company}</div>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Company" value={company} className={`w-1/2`}
						   onChange={(event) => setCompany(event.currentTarget.value)}/>
				<TextInput label="Position" value={position} className={`w-1/2`}
						   onChange={(event) => setPosition(event.currentTarget.value)}/>
			</div>
			<div className={`flex flex-row space-x-5`}>
				<DatePickerInput
					className={`w-1/3`}
					label="Start date"
					value={start_date}
					onChange={setStartDate}
				/>
				<DatePickerInput
					className={`w-1/3`}
					label="End date"
					value={end_date}
					onChange={setEndDate}
				/>
				<TextInput label="Location" value={location}
						   className={`w-1/3`}
						   onChange={(event) => setLocation(event.currentTarget.value)}/>
			</div>
		</div>
	);
}