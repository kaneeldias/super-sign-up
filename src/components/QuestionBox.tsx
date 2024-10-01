import ProductButton from "@/components/ProductButton";
import YesNoButton from "@/components/YesNoButton";
import GTaSubProductButton from "@/components/GTaSubProductButton";
import NextButton from "@/components/NextButton";
import StartDatePicker from "@/components/StartDatePicker";
import SDGSelector from "@/components/SDGSelector";
import Image from "next/image";
import {Question} from "@/schemas/flow";
import ForceSignUp from "@/components/ForceSignUp";

type Props = {
	item: Question
	setAnswer: (answer: any) => void
}

export default function QuestionBox(props: Props) {
	// @ts-ignore
	return (
		<div className={`flex flex-col items-start space-y-5 rounded-md p-10 bg-white md:max-w-5xl`}>
			<div className={`flex flex-col space-y-2`}>

				{ props.item.answersType == "Product" && (
					<div className={`flex flex-col w-32 md:w-64 -m-1 mb-3 items-center justify-center`}>
						<Image src={"/aiesec-logo.png"} alt={"AIESEC Logo"} width={600} height={100}/>
					</div>
				)}

				{ props.item.preText && (
					<div className={`font-extralight text-gray text-sm md:text-lg ${props.item.answersType == "Product" ? "pb-10" : ""}`}>{props.item.preText}</div>
				)}

				<div className={`font-bold text-gray text-lg md:text-3xl leading-relaxed md:leading-relaxed`}>{props.item.question}</div>
			</div>

			<div className={`flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5`}>

				{ props.item.answersType == "Comment" && (
					<NextButton buttonText={"Let's get started"} onClick={() => {props.setAnswer(props.item.options[0].next)} }/>
				)}

				{ props.item.answersType == "Product" && (
					props.item.options.map(option => (
						<ProductButton key={option.value} type={option.value as "GV" | "GTa" | "GTe"} onClick={() => {props.setAnswer(option.value)}}/>
					))
				)}

				{ props.item.answersType == "YesNo" && (
					props.item.options.map(option => (
						<YesNoButton key={option.value} type={option.value as "Yes" | "No"} onClick={() => {props.setAnswer(option.value)}}/>
					))
				)}

				{ props.item.answersType == "GTaSubProduct" && (
					<div className={'flex flex-col'}>
						{ props.item.options.map(option => (
							<GTaSubProductButton key={option.value} text={option.value} onClick={() => {props.setAnswer(option.value)}}/>
						))}
					</div>
				)}
				
				{ props.item.answersType == "SDGSelection" && (
					<SDGSelector setAnswer={props.setAnswer}/>
				)}
				
				{ props.item.answersType == "Date" && (
					<StartDatePicker item={props.item} setAnswer={props.setAnswer}/>
				)}

				{ props.item.answersType == "ForceSignUp" && (
					<ForceSignUp setAnswer={props.setAnswer}/>
				)}
				
			</div>
		</div>
	)
}