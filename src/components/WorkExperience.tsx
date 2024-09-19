import {WorkExperience as WorkExperienceType} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import MiniBox from "@/components/Mini/MiniBox";
import MiniBoxTitle from "@/components/Mini/MiniBoxTitle";
import TextInput from "@/components/Inputs/TextInput";
import DateInput from "@/components/Inputs/DateInput";
import SelectInput from "@/components/Inputs/SelectInput";
import {COUNTRIES} from "@/schemas/country";
import {Textarea} from "@mantine/core";
import {WORK_TYPES} from "@/schemas/work_types";

type Props = {
	experience: WorkExperienceType
	updateExperience: (experience: WorkExperienceType) => void
}

export default function WorkExperience(props: Props) {
	const [position, setPosition] = useState<string>(props.experience.position);
	const [employment_type, setEmployment_type] = useState<number>(props.experience.employment_type);
	const [company, setCompany] = useState<string>(props.experience.company);
	const [start_date, setStartDate] = useState<Date | null>(new Date(props.experience.start_date!));
	const [end_date, setEndDate] = useState<Date | null>(new Date(props.experience.end_date!));
	const [country, setCountry] = useState<number | null>(props.experience.country);
	const [description, setDescription] = useState<string>(props.experience.description);

	useEffect(() => {
		props.updateExperience({company, employment_type, position, country, start_date, end_date, description});
	}, [company, employment_type, position, country, start_date, end_date, description]);

	return (
		<MiniBox>
			<MiniBoxTitle>{position} at {company}</MiniBoxTitle>

			<div className={`flex flex-row space-x-5`}>
				<TextInput label="Company" value={company} className={`w-1/2`} setValue={setCompany}/>
				<TextInput label="Position" value={position} className={`w-1/2`} setValue={setPosition}/>
			</div>

			<div className={`flex flex-row space-x-5`}>
				<SelectInput label={"Employment type"}
							 value={employment_type.toString()}
							 setValue={setEmployment_type}
							 data={WORK_TYPES.map((type) => ({value: type.id.toString(), label: type.name}))}
							 className={`w-1/2`}
			 	/>

				<SelectInput
					label={"Country"}
					value={country!.toString()}
					setValue={setCountry}
					data={COUNTRIES.map((country) => ({value: country.id.toString(), label: country.name}))}
					className={`w-1/2`}
				/>
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
			</div>

			<div>
				<Textarea label={"Description"}
						  onChange={(event) => {
							  	setDescription(event.currentTarget.value);
							  }
						  }
						  value={description}
				/>
			</div>
		</MiniBox>
	);
}