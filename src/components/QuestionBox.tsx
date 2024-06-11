import {Question} from "@/config/flow";
import {AnimatePresence, motion} from "framer-motion";
import ProductButton from "@/components/ProductButton";
import YesNoButton from "@/components/YesNoButton";
import GTaSubProductButton from "@/components/GTaSubProductButton";
import NextButton from "@/components/NextButton";
import StartDatePicker from "@/components/StartDatePicker";

type Props = {
	item: Question
	setAnswer: (answer: any) => void
}

export default function QuestionBox(props: Props) {
	return (
		<motion.div
			initial={{opacity: 0, x: '50%'}}
			animate={{ opacity: 1, x: '0%', transition: {delay: 0.5} }}
			exit={{opacity: 0, x: '-100%'}}
		>
			<div className={`flex flex-col items-start space-y-5 rounded-md p-10 bg-white md:max-w-5xl`}>
				{ props.item.preText && (
					<div className={`preText`}>{props.item.preText}</div>
				)}
				
				<div className={`font-bold text-gray text-lg md:text-3xl`}>{props.item.question}</div>
				
				<div className={`flex flex-col space-y-5 md:flex-row md:space-x-5`}>
					
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
					
					{ props.item.answersType == "Date" && (
						<StartDatePicker item={props.item} setAnswer={props.setAnswer}/>
					)}
					
				</div>
			</div>
		</motion.div>
	)
}