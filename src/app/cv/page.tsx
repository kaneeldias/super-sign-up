"use client"

import {CvInfo} from "@/schemas/cv_info";
import {useState} from "react";
import CVInfo from "@/components/CVinfo";
import CVUpload from "@/components/CVUpload";
import {IconCaretLeft, IconCaretRight, IconFileArrowLeft} from "@tabler/icons-react";
import {rem} from "@mantine/core";

export default function CV() {
	const [cvInfo, setCvInfo] = useState<CvInfo | null>(null);

	return (
		<div className={`flex w-full h-full min-h-screen min-w-screen items-center justify-center m-5`}>
			{!cvInfo && <CVUpload setCvInfo={setCvInfo} />}
			{cvInfo &&
				<div className={`flex flex-row space-x-10 items-center`}>
					<CVInfo cvInfo={cvInfo} />
					<div className={`flex flex-row space-x-5 items-center hover:bg-black hover:bg-opacity-10 p-5 rounded-md transition-all cursor-pointer`}>
						<div className={`flex flex-row space-x-5 bg-white bg-opacity-50 rounded-full`}>
							<IconCaretRight style={{ width: rem(60), height: rem(60) }} stroke={0.5} />
						</div>

						<div className={`font-bold`}>Find Opportunities</div>
					</div>
				</div>
			}
		</div>
	)
}