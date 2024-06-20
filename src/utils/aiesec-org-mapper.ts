import {Profile} from "@/app/page";
import {base} from "next/dist/build/webpack/config/blocks/base";

export function getUrl(profile: Profile) {
	let baseUrl = "https://aiesec.org/search?";
	
	if (profile.product && !baseUrl.includes("project")) {
		baseUrl += `programmes=${programmesMap[profile.product]}`;
	}
	
	if (profile.sdg) {
		if (profile.sdg == 3) {
			baseUrl = "https://aiesec.org/project/1280511?"
		}
		else if (profile.sdg == 10) {
			baseUrl = "https://aiesec.org/project/1280521?"
		}
		else if (profile.sdg == 13) {
			baseUrl = "https://aiesec.org/project/1280522?"
		}
		else if (profile.sdg == 15) {
			baseUrl = "https://aiesec.org/project/1280523?"
		}
		else {
			baseUrl += `&sdg_goals=111${profile.sdg.toFixed(0).padStart(2, "0")}`;
		}
	}
	
	// @ts-ignore
	if (profile.gtaSubProduct && subProductsMap[profile.gtaSubProduct] != undefined) {
		// @ts-ignore
		baseUrl += `&sub_products=${subProductsMap[profile.gtaSubProduct]}`;
	}
	
	if (profile.duration && profile.duration != "I am flexible") {
		let durationString = profile.duration.split(" ")[0].toLowerCase()
		baseUrl += `&duration_type=${durationString}`;
	}
	
	// @ts-ignore
	if (profile.region && regionsMap[profile.region] != undefined) {
		// @ts-ignore
		baseUrl += `&regions=${regionsMap[profile.region]}`;
	}
	
	if (profile.earliestStartDate) {
		baseUrl += `&earliest_start_date=${getDateStringFromDate(profile.earliestStartDate)}`;
	}
	
	return baseUrl;
}

const programmesMap = {
	"GV": "7",
	"GTa": "8",
	"GTe": "9"
}

const subProductsMap = {
	"Business Administration": "54",
	"Information Technology": "55",
	"Marketing": "56",
	"Engineering": "57",
	"Other": "58",
	"Finance": "59",
	"Business Development": "60",
}

const regionsMap = {
	"Americas": "1627",
	"Asia Pacific": "1630",
	"Europe": "1629",
	"Middle East & Africa": "1632",
}

export function getDateStringFromDate(date: Date): string {
	return date.toISOString().split('T')[0];
}