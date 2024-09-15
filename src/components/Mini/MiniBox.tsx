type Props = {
    children: React.ReactNode;
    borderColor?: string;
}

export default function MiniBox(props: Props) {
    const borderColor = props.borderColor || "border-aiesec-blue";

    return (
        <div className={`flex flex-col space-y-2 bg-black bg-opacity-30 rounded-r-md p-3 ${borderColor} border-l-4 border-solid`}>
            {props.children}
        </div>
    )
}