import { motion } from "framer-motion"

type Props = {
	text: string,
	onClick: () => void;
}

export default function GTaSubProductButton(props: Props) {
	return (
		<motion.div className={`
		`}
			whileTap={{ scale: 0.9 }}
		>
			<div className={`flex items-center justify-center mr-5 mb-5 bg-[#EEEEEE] font-bold uppercase px-5 py-3 rounded-md md:w-96 text-md md:text-lg cursor-pointer text-gray hover:bg-aiesec-blue hover:text-white transition-all`}
				onClick={props.onClick}
			>
				<div className={`text-center`}>
					{props.text}
				</div>
			</div>
		</motion.div>
	);
}