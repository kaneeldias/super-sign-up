import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {WorkExperience} from "@/schemas/cv_info";
import {getDateStringFromDate} from "@/utils/aiesec-org-mapper";
import {getPersonId} from "@/utils/expa-utils";

export async function POST(request: NextRequest) {
	let errorFlag = false;

	const workExperiences: WorkExperience[] = (await request.json()).workExperience;
	const personId  = await getPersonId();
	console.log(personId);

	for (const experience of workExperiences) {
		try {
			const query = `
				mutation {
				  createPersonProfessionalExperience(
					id: ${personId},
					professional_experience: {
					  title: "${experience.position}",
					  organisation_name: "${experience.company}",
					  country_id: ${experience.country},
					  work_type: ${experience.employment_type},
					  description: "${experience.description}",
					  start_date: "${getDateStringFromDate(experience.start_date ?? new Date())}",
					  end_date: "${getDateStringFromDate(experience.end_date ?? new Date())}",
					}
				  ) {
					title
				  }
				}
			`

			console.log(query);

			await fetch("https://api.aiesec.org/graphql", {
				method: "POST",
				body: JSON.stringify({query}),
				headers: {
					"Content-Type": "application/json",
					"Authorization": cookies().get("access_token")?.value!
				}
			}).catch(e => {
				console.error(e);
				errorFlag = true;
			});
		} catch (e) {
			console.error(e);
			errorFlag = true;
		}
	}

	return NextResponse.json({success: !errorFlag});
}

