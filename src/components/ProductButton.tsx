import {motion} from "framer-motion"

type Props = {
	type?: "GV" | "GTe" | "GTa";
	onClick: () => void;
}

export default function ProductButton(props: Props) {
	let bgColor = "bg-aiesec-blue";
	let text = "Create an account";
	switch (props.type) {
		case "GTe":
			bgColor = "bg-gte-orange";
			text = "Teach Abroad";
			break;
		case "GTa":
			bgColor = "bg-gta-green";
			text = "Intern Abroad";
			break;
		case "GV":
			bgColor = "bg-gv-red";
			text = "Volunteer Abroad";
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