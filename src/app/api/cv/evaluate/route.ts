import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";
// @ts-ignore
import {TextContentBlock} from "openai/src/resources/beta/threads/messages";

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

	return NextResponse.json({fileName: cv.name, data: response});
}

