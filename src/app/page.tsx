"use client"
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import QuestionBox from "@/components/QuestionBox";
import {FLOW, Question} from "@/config/flow";
import {getUrl} from "@/utils/aiesec-org-mapper";
import {Loader, Progress} from "@mantine/core";

export type Profile = {
	product?: "GV" | "GTa" | "GTe",
	gtaSubProduct?: string
	duration?: string
	region?: string
	earliestStartDate?: Date
	sdg?: number
}

const ANIMATIONS =  {
	initial: {x: 300, opacity: 0 },
	animate: {x: 0, opacity: 1, transition: { delay: 0 }},
	exit: {x: -300, opacity: 0 }
}

export default function Home() {
	const [question, setQuestion] = useState(1);
	const [profile, setProfile] = useState<Profile>({});
	const [progress, setProgress] = useState(0);
	
	function handleNext() {
		const questionFlow = FLOW[question] as Question;
		
		setProgress(10);
		setQuestion(questionFlow.options[0].next);
		console.log(profile);
	}
	
	function handleProductSelection(product: "GV" | "GTa" | "GTe") {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			product: product
		});
		
		setProgress(30);
		setQuestion(questionFlow.options.find(option => option.value == product)!.next)
		console.log(profile);
	}
	
	function handleDurationSelection(duration: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			duration: duration
		});
		
		setProgress(70);
		setQuestion(questionFlow.options.find(option => option.value == duration)!.next)
		console.log(profile);
	}
	
	function handleRegionSelection(region: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			region: region
		});
		
		setProgress(90);
		setQuestion(questionFlow.options.find(option => option.value == region)!.next)
		console.log(profile);
	}
	
	function handleGTaSubProductSelection(subProduct: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			gtaSubProduct: subProduct
		});
		
		setProgress(50);
		setQuestion(questionFlow.options.find(option => option.value == subProduct)!.next)
		console.log(profile);
	}
	
	function handleStartDateSelection(startDate: Date) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			earliestStartDate: startDate
		})
		
		setProgress(100);
		setQuestion(questionFlow.options[0].next)
		console.log(profile);
	}
	
	function handleSDGSelection(sdg: number) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			sdg: sdg
		})
		
		setProgress(100);
		setQuestion(questionFlow.options[0].next)
		console.log(profile);
	}
	
	useEffect(() => {
		if (question == -1) {
			redirectUser();
		}
	}, [question])
	
	function redirectUser() {
		window.location.href = getUrl(profile);
	}
	
	return (
		<div className={`flex flex-col h-screen w-full md:p-10 p-2`}>
			<Progress value={progress} />
			<div className={`flex flex-row h-screen w-full items-center justify-center`}>
				
				<AnimatePresence mode="wait">
				
					{ question == -1 && (
						<motion.div
							key={-1}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
							<Loader color="blue"/>
						</motion.div>
					)}
				
					{ question == 0 && (
						<motion.div
							key={0}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
						<QuestionBox item={FLOW[0]} setAnswer={handleNext}/>
						</motion.div>
					)}
					
					{ question == 1 && (
						<motion.div
							key={1}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
						<QuestionBox item={FLOW[1]} setAnswer={handleProductSelection}/>
						</motion.div>
					)}
				
					{ question == 2 && (
						<>
							<motion.div
								key={2}
								initial={ANIMATIONS.initial}
								animate={ANIMATIONS.animate}
								exit={ANIMATIONS.exit}
							>
								<QuestionBox item={FLOW[2]} setAnswer={handleGTaSubProductSelection}/>
							</motion.div>
						</>
					)}

					{question == 3 && (
						<motion.div
							key={3}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
							<QuestionBox item={FLOW[3]} setAnswer={handleDurationSelection}/>
						</motion.div>
					)}
				
					{ question == 4 && (
						<motion.div
							key={4}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
						<QuestionBox item={FLOW[4]} setAnswer={handleRegionSelection}/>
						</motion.div>
					)}
				
					{ question == 5 && (
						<motion.div
							key={5}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
						<QuestionBox item={FLOW[5]} setAnswer={handleStartDateSelection}/>
						</motion.div>
					)}
					
					{ question == 6 && (
						<motion.div
							key={6}
							initial={ANIMATIONS.initial}
							animate={ANIMATIONS.animate}
							exit={ANIMATIONS.exit}
						>
							<QuestionBox item={FLOW[6]} setAnswer={handleSDGSelection}/>
						</motion.div>
					)}
				</AnimatePresence>
			
			</div>
		</div>
	);
}
