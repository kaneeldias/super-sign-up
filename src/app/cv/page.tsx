"use client"

import {CvInfo} from "@/schemas/cv_info";
import {useState} from "react";
import CVInfo from "@/components/CVinfo";
import CVUpload from "@/components/CVUpload";
import {IconCaretRight} from "@tabler/icons-react";
import {rem} from "@mantine/core";
import CreateAccount from "@/components/CreateAccount";
import {AnimatePresence, motion} from "framer-motion";
import OpportunitiesList from "@/components/OpportunitiesList";

const ANIMATIONS =  {
	initial: {opacity: 0 },
	animate: {opacity: 1, transition: { delay: 0 }},
	exit: {opacity: 0 }
}

export default function CV() {
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [cvInfo, setCvInfo] = useState<CvInfo | null>(null);
	const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
	const [userCreated, setUserCreated] = useState<boolean>(false);

	return (
		<div className={`flex w-full h-full min-h-screen min-w-screen items-center justify-center p-5`}>

			<AnimatePresence mode="wait">
				{!cvInfo && !showCreateAccount &&
					<motion.div
						key={1}
						initial={ANIMATIONS.initial}
						animate={ANIMATIONS.animate}
						exit={ANIMATIONS.exit}
					>
						<CVUpload setCvInfo={setCvInfo} cvFile={cvFile} setCvFile={setCvFile}/>
					</motion.div>
				}

				{cvInfo && !showCreateAccount &&
					<motion.div
						key={2}
						initial={ANIMATIONS.initial}
						animate={ANIMATIONS.animate}
						exit={ANIMATIONS.exit}
					>
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
					</motion.div>
				}

				{showCreateAccount && !userCreated &&
					<motion.div
						key={3}
						initial={ANIMATIONS.initial}
						animate={ANIMATIONS.animate}
						exit={ANIMATIONS.exit}
					>
						<CreateAccount setUserCreated={setUserCreated}/>
					</motion.div>
				}

				{userCreated &&
					<motion.div
						key={4}
						initial={ANIMATIONS.initial}
						animate={ANIMATIONS.animate}
						exit={ANIMATIONS.exit}
					>
						<OpportunitiesList cvFile={cvFile}/>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}