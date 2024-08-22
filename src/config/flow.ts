export type Question = {
	question: string,
	preText?: string ,
	answersType: "Product" | "YesNo" | "GTaSubProduct" | "Comment" | "Date" | "SDGSelection"
	options: {
		value: string,
		next: number
	}[]
}

type Flow = {
	[key: number]: Question
}

export const FLOW: Flow = {
	0: {
		question: "AIESEC is a global youth-led organization that develops leadership skills through international internships and volunteer experiences.",
		answersType: "Comment",
		options: [
			{ value: "Next", next: 1 }
		]
	},
	1: {
		preText: "AIESEC is a global youth-led organization that develops leadership skills through international internships and volunteer experiences.",
		question:"Which project do you want to explore today?",
		answersType: "Product",
		options: [
			{ value: "GV", next: 6 },
			{ value: "GTa", next: 2 },
			{ value: "GTe", next: 3 }
		]
	},
	2: {
		question: "Which one is your study background?",
		preText:"We have different categories of internships based on the field of reference",
		answersType: "GTaSubProduct",
		options: [
			{ value: "Business Administration", next: 3 },
			{ value: "Information Technology", next: 3 },
			{ value: "Marketing", next: 3 },
			{ value: "Engineering", next: 3 },
			{ value: "Finance", next: 3 },
			{ value: "Business Development", next: 3 },
			{ value: "Other", next: 3 },
		]
	},
	3: {
		question: "Which duration fits the best with your interest and needs?",
		preText:"We offer our opportunities in different durations",
		answersType: "GTaSubProduct",
		options: [
			{ value: "Short (6-12 weeks)", next: 4 },
			{ value: "Medium (3-6 months)", next: 4 },
			{ value: "Long (6+ months)", next: 4 },
			{ value: "I am flexible", next: 4}
		]
	},
	4: {
		preText: "We have opportunities all around the globe",
		question:"In which region would you like to explore our programs?",
		answersType: "GTaSubProduct",
		options: [
			{ value: "Americas", next: 5 },
			{ value: "Asia Pacific", next: 5 },
			{ value: "Europe", next: 5 },
			{ value: "Middle East & Africa", next: 5 },
			{ value: "I am flexible", next: 5}
		]
	},
	5: {
		question: "What is the earliest date you would like to start a project?",
		answersType: "Date",
		options: [
			{ value: "Find my opportunities", next: -1 },
		]
	},
	6: {
		preText: "All our Global Volunteer experiences are a maximum 8 weeks and each of them is built to contribute directly to one of the SDGs",
		question:"Which SDG would you like to contribute to while volunteering abroad?",
		answersType: "SDGSelection",
		options: [
			{ value: "Next", next: 5 }
		]
	},
}