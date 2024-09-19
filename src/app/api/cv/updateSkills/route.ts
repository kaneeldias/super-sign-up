import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
	const skills: number[] = (await request.json()).skills;

	const query = `
		mutation {
		  currentPersonUpdate(person: {
			person_profile_attributes: {
			  skills: [${skills.map(skill => `{id:${skill}, level:2}`).join(",")}]
			}
		  }) {
		  	full_name
		  }
		}
	`

	const response = await fetch(`${process.env.NEXT_PUBLIC_GIS_API_ENDPOINT}/graphql`, {
		method: "POST",
		body: JSON.stringify({query}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": cookies().get("access_token")?.value!
		}
	})

	const responseData = await response.json();
	return NextResponse.json(responseData);
}

