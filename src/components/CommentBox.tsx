import NextButton from "@/components/NextButton";

type Props = {
	comment: string;
	onClick: () => void;
}

export default function CommentBox(props: Props) {
	
	return (
		<div>
			<div>
				{props.comment}
			</div>
			<NextButton onClick={props.onClick}/>
		</div>
	);
}