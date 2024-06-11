import { motion } from "framer-motion"

type Props = {
	type: "Yes" | "No";
	onClick: () => void;
}

export default function YesNoButton(props: Props) {
	let bgColor = "bg-[#27ae60]";
	let text = "Yes";
	switch (props.type) {
		case "No":
			bgColor = "bg-[#e74c3c]";
			text = "No";
			break;
	}
	
	return (
		<motion.div className={`
		`}
			whileHover={{ scale: 1.1, rotate: 3}}
			whileTap={{ scale: 0.9 }}
		>
			<div className={`${bgColor} text-center font-bold uppercase px-5 py-2 rounded-md w-36 cursor-pointer`}
				onClick={props.onClick}
			>
				{text}
			</div>
		</motion.div>
	);
}