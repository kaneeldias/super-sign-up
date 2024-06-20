import { motion } from "framer-motion"
import Image from "next/image";

type Props = {
	sdg: number
	setAnswer: (answer: any) => void;
}

export default function SDGBox(props: Props) {
	return (
		<motion.div
			whileHover={{scale: 1.1}}
			whileTap={{scale: 0.9}}
			className={`w-32 m-3`}
			onClick={() => props.setAnswer(props.sdg)}
		>
			<Image
				src={`/sdg_logos/${props.sdg}.png`}
				alt={`SDG ${props.sdg} logo`}
				width={200} height={200}
				className={`rounded-md hover:cursor-pointer`}>
			</Image>
		</motion.div>
	);
}