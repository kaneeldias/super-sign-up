"use client"
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import QuestionBox from "@/components/QuestionBox";
import {FLOW, Question} from "@/config/flow";
import {getUrl} from "@/utils/aiesec-org-mapper";
import {Loader} from "@mantine/core";

export type Profile = {
	product?: "GV" | "GTa" | "GTe",
	gtaSubProduct?: string
	duration?: string
	region?: string
	earliestStartDate?: Date
}

export default function Home() {
	const [question, setQuestion] = useState(0);
	const [profile, setProfile] = useState<Profile>({});
	
	function handleNext() {
		const questionFlow = FLOW[question] as Question;
		
		setQuestion(questionFlow.options[0].next);
		console.log(profile);
	}
	
	function handleProductSelection(product: "GV" | "GTa" | "GTe") {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			product: product
		});
		
		setQuestion(questionFlow.options.find(option => option.value == product)!.next)
		console.log(profile);
	}
	
	function handleDurationSelection(duration: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			duration: duration
		});
		
		setQuestion(questionFlow.options.find(option => option.value == duration)!.next)
		console.log(profile);
	}
	
	function handleRegionSelection(region: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			region: region
		});
		
		setQuestion(questionFlow.options.find(option => option.value == region)!.next)
		console.log(profile);
	}
	
	function handleGTaSubProductSelection(subProduct: string) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			gtaSubProduct: subProduct
		});
		
		setQuestion(questionFlow.options.find(option => option.value == subProduct)!.next)
		console.log(profile);
	}
	
	function handleStartDateSelection(startDate: Date) {
		const questionFlow = FLOW[question] as Question;
		setProfile({
			...profile,
			earliestStartDate: startDate
		})
		
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
		<div className={`flex flex-row h-screen w-full items-center justify-center`}>
			
			<AnimatePresence>
				{ question == -1 && (
					<motion.div
						initial={{opacity: 0, x: '50%'}}
						animate={{ opacity: 1, x: '0%', transition: {delay: 0.5} }}
						exit={{opacity: 0, x: '-100%'}}
					>
						<Loader color="blue"/>
					</motion.div>
				)}
			
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 0 && (
					<QuestionBox item={FLOW[0]} setAnswer={handleNext}/>
				)}
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 1 && (
					<QuestionBox item={FLOW[1]} setAnswer={handleProductSelection}/>
				)}
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 2 && (
					<QuestionBox item={FLOW[2]} setAnswer={handleGTaSubProductSelection}/>
				)}
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 3 && (
					<QuestionBox item={FLOW[3]} setAnswer={handleDurationSelection}/>
				)}
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 4 && (
					<QuestionBox item={FLOW[4]} setAnswer={handleRegionSelection}/>
				)}
			</AnimatePresence>
			
			<AnimatePresence>
				{ question == 5 && (
					<QuestionBox item={FLOW[5]} setAnswer={handleStartDateSelection}/>
				)}
			</AnimatePresence>
		
		</div>
	);
}
