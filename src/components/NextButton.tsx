import { motion } from "framer-motion"

type Props = {
	buttonText: string;
	onClick: () => void;
}

export default function NextButton(props: Props) {
	return (
		<motion.div className={`
		`}
			whileHover={{ scale: 1.1, rotate: 3}}
			whileTap={{ scale: 0.9 }}
		>
			<div className={`bg-aiesec-blue text-center text-white font-bold uppercase px-5 py-3 rounded-md md:w-64 text-md md:text-lg cursor-pointer`}
				onClick={props.onClick}
			>
				{props.buttonText}
			</div>
		</motion.div>
	);
}