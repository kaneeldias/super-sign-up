"use client"

import {Button, FileButton, FileInput, rem} from "@mantine/core";

import { IconFileCv } from '@tabler/icons-react';
import Image from "next/image";
import {useState} from "react";

export default function CV() {
	const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
	const [file, setFile] = useState<File | null>(null);
	const borderColor = file ? "border-aiesec-blue" : "border-yellow";

	function evaluateCV() {
		alert("This CV sucks bro");
	}

	return (
		<div className={`flex w-full h-full items-center justify-center text-white`}>
			<div className={`bg-bg-dark p-5 rounded-md flex-row min-w-96 space-y-5 ${borderColor} border-solid border-b-2`}>
				<div>
					<div className={`text-xl font-bold`}>Upload your resume</div>
					<div className={`text-sm text-light-gray`}>Get free personalized inputs and search for opportunities
						that suit you
					</div>
				</div>
				<div>
					<FileInput
						leftSection={icon}
						placeholder="Your CV"
						leftSectionPointerEvents="none"
						value={file ? file : null}
						onChange={setFile}
						accept={"application/pdf"}
					/>
				</div>

				{ !file &&
					<FileButton onChange={setFile} accept="pdf">
						{(props) => <Button {...props} color={"yellow"}>Upload resume</Button>}
					</FileButton>
				}

				{ file && <Button color={"blue"} onClick={evaluateCV}>Get started</Button> }

				<Image src={"/aiesec-logo-black.png"} alt={"AIESEC Logo"} width={200} height={100} className={`-ml-1 pt-10`}/>

			</div>
		</div>
	)
}