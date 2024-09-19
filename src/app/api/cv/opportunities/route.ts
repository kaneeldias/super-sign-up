import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
	const data = await request.json();
	const skillIds = data.skill_ids;
	const backgroundIds = data.background_ids;
	const nationalityIds = data.nationality_ids;

	const query = `
			{
			  opportunities(
				page: 1
				per_page: 500
				filters: {
				  ${skillIds.length > 0 ? `skill_ids: [${skillIds.join(",")}]` : ""}
				  ${backgroundIds.length > 0 ? `background_ids: [${backgroundIds.join(",")}]` : ""}
				  ${nationalityIds.length > 0 ? `nationalities: [${nationalityIds.join(",")}]` : ""}
				}
			  ) {
				data {
				  id
				  title
				  location
				  skills {
				    constant_id
				  }
				  backgrounds {
				    constant_id
				  }
				  description
				  organisation {
					name
				  }
				}  
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
	console.log(responseData);
	const opportunities = responseData.data.opportunities.data;
	for (let opportunity of opportunities) {
		let score = 0;
		for (let skill of opportunity.skills) {
			if (skillIds.includes(skill.constant_id.toString())) {
				const index = skillIds.indexOf(skill.constant_id.toString());
				score = score + (skillIds.length - index);
			}
		}
		for (let background of opportunity.backgrounds) {
			if (backgroundIds.includes(background.constant_id.toString())) {
				const index = backgroundIds.indexOf(background.constant_id.toString());
				score = score + (backgroundIds.length - index);
			}
		}
		opportunity.score = score;
	}

	const sortedOpportunities = opportunities.sort((a: any, b: any) => b.score - a.score);
	return NextResponse.json(sortedOpportunities);
}

//get current data in yyyy-mm-dd format
function getCurrentDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

