import Image from "next/image";

type Props = {
    children: React.ReactNode;
    borderColor?: string;
    className?: string;
}

export default function ContainerBox(props: Props) {
    const borderColor = props.borderColor || "border-aiesec-blue";

    return (
        <div className={`bg-white p-5 rounded-md flex-row min-w-96 space-y-5 ${borderColor} border-solid border-b-8 ${props.className}`}>
            {props.children}

            <Image src={"/aiesec-logo.png"} alt={"AIESEC Logo"} width={200} height={100}
                   className={`-ml-1 pt-10`}/>
        </div>

    )
}