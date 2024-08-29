import { motion } from "framer-motion"

type Props = {
	type: "GV" | "GTe" | "GTa";
	onClick: () => void;
}

export default function ProductButton(props: Props) {
	let bgColor = "bg-gv-red";
	let text = "Volunteer Abroad";
	switch (props.type) {
		case "GTe":
			bgColor = "bg-gte-orange";
			text = "Teach Abroad";
			break;
		case "GTa":
			bgColor = "bg-gta-green";
			text = "Intern Abroad";
			break;
	}

	function buttonClick() {
		props.onClick();
	}
	
	return (
		<motion.div className={`
		`}
			whileHover={{ scale: 1.1, rotate: 3}}
			whileTap={{ scale: 0.9 }}
		>
			<div className={`${bgColor} text-center text-white font-bold uppercase px-5 py-3 rounded-md md:w-64 text-md md:text-lg  cursor-pointer`}
				onClick={buttonClick}
			>
				{text}
			</div>
		</motion.div>
	);
}