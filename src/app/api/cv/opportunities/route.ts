import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
	const data = await request.json();
	const skillIds = data.skill_ids;
	const backgroundIds = data.background_ids;

	const query = `
			{
			  opportunities(
				page: 1
				per_page: 500
				filters: {
				  ${skillIds.length > 0 ? `skill_ids: [${skillIds.join(",")}]` : ""}
				  ${backgroundIds.length > 0 ? `background_ids: [${backgroundIds.join(",")}]` : ""}
				  earliest_start_date: "${getCurrentDate()}"
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
				}  
			  }
			}
		`

	const response = await fetch(`${process.env.NEXT_PUBLIC_GIS_API_ENDPOINT}/graphql`, {
		method: "POST",
		body: JSON.stringify({query}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": `${process.env.GIS_ACCESS_TOKEN}`
		}
	})

	const opportunities = (await response.json()).data.opportunities.data;
	for (let opportunity of opportunities) {
		let score = 0;
		for (let skill of opportunity.skills) {
			if (skillIds.includes(skill.constant_id.toString())) {
				score++;
			}
		}
		for (let background of opportunity.backgrounds) {
			if (backgroundIds.includes(background.constant_id.toString())) {
				score++;
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

