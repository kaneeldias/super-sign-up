type Props = {
    children: React.ReactNode;
    borderColor?: string;
    className?: string;
}

export default function ContainerBox(props: Props) {
    const borderColor = props.borderColor || "border-aiesec-blue";

    return (
        <div className={`bg-bg-dark p-5 rounded-md flex-row min-w-96 space-y-5 ${borderColor} border-solid border-b-2 ${props.className}`}>
            {props.children}
        </div>
    )
}