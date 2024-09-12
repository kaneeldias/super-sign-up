import {TextInput} from "@mantine/core";
import {EducationalBackground as EducationalBackgroundType} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import {DatePickerInput} from "@mantine/dates";

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
		<div
			className={`flex flex-col space-y-2 bg-black bg-opacity-30 rounded-r-md p-3 border-green border-l-4 border-solid`}>
			<div
				className={`font-bold text-sm bg-green rounded-r-md -mt-3 -ml-3 px-2 bg-opacity-20`}>{institution}</div>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Institution" value={institution} className={`w-full`}
						   onChange={(event) => setInstitution(event.currentTarget.value)}/>
			</div>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Area" value={area} className={`w-full`}
						   onChange={(event) => setArea(event.currentTarget.value)}/>
				<TextInput label="Study type" value={area} className={`w-full`}
						   onChange={(event) => setStudyType(event.currentTarget.value)}/>
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