import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";
// @ts-ignore
import {TextContentBlock} from "openai/src/resources/beta/threads/messages";
import {CvInfo, WorkExperience} from "@/schemas/cv_info";
import {COUNTRIES} from "@/schemas/country";
import {WORK_TYPES} from "@/schemas/work_types";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(request: NextRequest)	 {
	const formData = await request.formData();
	const cv = formData.get("file") as File;
	console.log(cv);

	const file = await openai.files.create({
		file: cv,
		purpose: "assistants",
	});


	const thread = await openai.beta.threads.create({
		messages: [{
			role: "user",
			content: "Analyze the CV and extract information",
			attachments: [{
				file_id: file.id,
				tools: [{type: "file_search"}]
			}]
		}]
	});
	let run = await openai.beta.threads.runs.createAndPoll(
		thread.id,
		{
			assistant_id: "asst_WmSUTzWvdHNJE0yUO8OuaZxo",
			model: "gpt-4o-mini",
		},
	);

	let response;
	if (run.status === 'completed') {
		const messages = await openai.beta.threads.messages.list(
			run.thread_id
		);
		const message = messages.data.reverse().pop()!;
		const messageContent = message.content[0] as TextContentBlock;
		console.log(`${message.role} > ${messageContent.text.value}`);

		let responseText = messageContent.text.value;
		responseText = responseText.replaceAll("```json", "");
		responseText = responseText.replaceAll("```", "");

		response = JSON.parse(responseText);
	} else {
		console.log(run.status);
		response = {error: "An error occurred while processing the CV"};
	}

	const workExperiences: WorkExperience[] = [];
	for (const work_experience of response.work_experience) {
		const employment_type = parseInt(WORK_TYPES.find(wt => wt.name === work_experience.employment_type)?.id!);
		const country = parseInt(COUNTRIES.find(c => c.name === work_experience.country)?.id!);

		const we: WorkExperience = {
			company: work_experience.company,
			employment_type: employment_type,
			position: work_experience.position,
			country: country,
			start_date: new Date(work_experience.start_date),
			end_date: new Date(work_experience.end_date),
			description: work_experience.description
		};

		workExperiences.push(we);
	}

	const cvInfo: CvInfo = {
		first_name: response.first_name,
		last_name: response.last_name,
		email: response.email,
		phone: response.phone,
		country: response.country,
		work_experience: workExperiences,
		educational_background: response.educational_background
	};

	return NextResponse.json({fileName: cv.name, data: cvInfo});
}

