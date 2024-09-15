"use client"

import {CvInfo} from "@/schemas/cv_info";
import {useState} from "react";
import CVInfo from "@/components/CVinfo";
import CVUpload from "@/components/CVUpload";
import {IconCaretRight} from "@tabler/icons-react";
import {rem} from "@mantine/core";
import CreateAccount from "@/components/CreateAccount";

export default function CV() {
	const [cvInfo, setCvInfo] = useState<CvInfo | null>(null);
	const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);

	return (
		<div className={`flex w-full h-full min-h-screen min-w-screen items-center justify-center p-5`}>

			{!cvInfo && !showCreateAccount && <CVUpload setCvInfo={setCvInfo} />}

			{cvInfo && !showCreateAccount &&
				<div className={`flex flex-row space-x-10 items-center`}>
					<CVInfo cvInfo={cvInfo} />
					<div
						className={`flex flex-row space-x-5 items-center bg-aiesec-blue hover:bg-opacity-80 pl-5 rounded-full transition-all cursor-pointer text-white`}>
						<div className={`font-bold`} onClick={() => setShowCreateAccount(true)}>Find Opportunities</div>
						<div className={`flex flex-row space-x-5 bg-white bg-opacity-10 rounded-full text-white`}>
							<IconCaretRight style={{width: rem(60), height: rem(60)}} stroke={0.5}/>
						</div>

					</div>
				</div>
			}

			{showCreateAccount &&
				<CreateAccount cvInfo={cvInfo!}/>
			}
		</div>
	)
}