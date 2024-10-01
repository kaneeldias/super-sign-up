import NextButton from "@/components/NextButton";
import {useState} from "react";
import {DatePicker} from '@mantine/dates';
import {Question} from "@/schemas/flow";
import '@mantine/dates/styles.css';

type Props = {
	item: Question;
	setAnswer: (answer: any) => void;
}

export default function StartDatePicker(props: Props) {
	const [value, setValue] = useState<Date | null>(null);
	
	return (
		<div className={`flex flex-col space-y-5`}>
			<DatePicker
				defaultDate={getDate30DaysFromNow()}
				value={value}
				onChange={setValue}
				size={"md"}
				className={`bg-light-gray rounded-md`}
			/>
			<NextButton buttonText={props.item.options[0].value} onClick={() => {
				props.setAnswer(value)
			}}/>
		</div>
	
	);
}

function getDate30DaysFromNow(): Date {
	const today = new Date();
	const futureDate = new Date(today);
	futureDate.setDate(today.getDate() + 30);
	return futureDate;
}

function getDateStringFromDate(date: Date): string {
	return date.toISOString().split('T')[0];
}