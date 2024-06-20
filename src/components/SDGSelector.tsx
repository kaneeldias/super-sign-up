import { motion } from "framer-motion"
import SDGBox from "@/components/SDGBox";

type Props = {
	setAnswer: (answer: any) => void;
}

export default function SDGSelector(props: Props) {
	return (
		<div className={`flex flex-wrap`}>
			<SDGBox setAnswer={props.setAnswer} sdg={3} />
			<SDGBox setAnswer={props.setAnswer} sdg={4} />
			<SDGBox setAnswer={props.setAnswer} sdg={5} />
			<SDGBox setAnswer={props.setAnswer} sdg={8} />
			<SDGBox setAnswer={props.setAnswer} sdg={10} />
			<SDGBox setAnswer={props.setAnswer} sdg={12} />
			<SDGBox setAnswer={props.setAnswer} sdg={13} />
			<SDGBox setAnswer={props.setAnswer} sdg={15} />
			<SDGBox setAnswer={props.setAnswer} sdg={17} />
		</div>
	);
}