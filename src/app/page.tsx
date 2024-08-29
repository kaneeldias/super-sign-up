"use client"
import {AnimatePresence, motion} from "framer-motion";
import React, {useCallback, useEffect, useState} from "react";
import QuestionBox from "@/components/QuestionBox";
import {FLOW, Question} from "@/config/flow";
import {getUrl} from "@/utils/aiesec-org-mapper";
import {Loader, Progress} from "@mantine/core";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import * as sea from "node:sea";

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
	const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
	const router = useRouter();
	const pathname = usePathname()
	const searchParams = useSearchParams()


	useEffect(() => {
		console.log(searchParams.toString());
		const completedQuestionsTemp = [];
		const profileTemp: Profile = {};

		if (searchParams.has("product")) {
			profileTemp.product = searchParams.get("product") as "GV" | "GTa" | "GTe";
			completedQuestionsTemp.push(1);
		}

		if (searchParams.has("sdg")) {
			profileTemp.sdg = parseInt(searchParams.get("sdg")!);
			completedQuestionsTemp.push(6);
		}

		if (searchParams.has("gtaSubProduct")) {
			profileTemp.gtaSubProduct = searchParams.get("gtaSubProduct")!;
			completedQuestionsTemp.push(2);
		}

		if (searchParams.has("duration")) {
			profileTemp.duration = searchParams.get("duration")!;
			completedQuestionsTemp.push(3);
		}

		if (searchParams.has("region")) {
			profileTemp.region = searchParams.get("region")!;
			completedQuestionsTemp.push(4);
		}

		if (searchParams.has("startDate")) {
			profileTemp.earliestStartDate = new Date(searchParams.get("startDate")!);
			completedQuestionsTemp.push(5);
		}

		setProfile(profileTemp);
		setCompletedQuestions(completedQuestionsTemp);
		setQuestion(findNextQuestion(1, profileTemp, completedQuestionsTemp));
	}, [searchParams]);

	function findNextQuestion(question:number, profile: Profile, completedQuestions: number[]): number {
		console.log("finding next question...")
		console.log("completed questions:", completedQuestions);


		const questionFlow = FLOW[question] as Question;
		let nextQuestion = questionFlow.options[0].next
		if (question === 1) {
			if (completedQuestions.includes(1)) nextQuestion = questionFlow.options.find(option => option.value == profile.product)!.next
			else return 1;
		}

		if (completedQuestions.includes(nextQuestion)) {
			return findNextQuestion(nextQuestion, profile, completedQuestions);
		}
		return nextQuestion;
	}

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return pathname + '?' + params.toString()
		},
		[searchParams]
	)

	function handleNext() {
		setProgress(10);
		console.log(profile);
	}
	
	function handleProductSelection(product: "GV" | "GTa" | "GTe") {
		setProgress(30);
		router.push(createQueryString('product', product))
		console.log(profile);
	}
	
	function handleDurationSelection(duration: string) {
		setProgress(70);
		router.push(createQueryString('duration', duration.split(" ")[0].toLowerCase()))
		console.log(profile);
	}
	
	function handleRegionSelection(region: string) {
		setProgress(90);
		router.push(createQueryString('region', region))
		console.log(profile);
	}
	
	function handleGTaSubProductSelection(subProduct: string) {
		setProgress(50);
		router.push(createQueryString('gtaSubProduct', subProduct))
		console.log(profile);
	}
	
	function handleStartDateSelection(startDate: Date) {
		setProgress(100);
		router.push(createQueryString('startDate', startDate.toISOString().split('T')[0]));
		console.log(profile);
	}
	
	function handleSDGSelection(sdg: number) {
		setProgress(100);
		router.push(createQueryString('sdg', sdg.toString()))
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
