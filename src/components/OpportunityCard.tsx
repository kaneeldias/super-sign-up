"use client"

import React from "react";
import {SKILLS} from "@/schemas/skills";
import SkillsOrBackgroundChip from "@/components/SkillsOrBackgroundComponent/skillOrBackgroundChip";
import {BACKGROUNDS} from "@/schemas/backgrounds";
import {Opportunity} from "@/schemas/opportunities";

type Props = {
	opportunity: Opportunity;
	userSkills: string[];
	userBackgrounds: string[];
}

export default function OpportunityCard(props: Props) {
	const {opportunity} = props;

	return (
		<a href={`https://aiesec.org/opportunity/${opportunity.id}`} target={"_blank"}>
			<div className={`flex flex-col space-y-5 bg-light-gray rounded-md p-5 hover:bg-opacity-10 hover:bg-aiesec-blue transition-all hover:border-aiesec-blue border-2 border-solid border-light-gray`}>
				<div>
					<div className={`font-bold text-md`}>{opportunity.title}</div>
					<div className={'text-xs text-bg-dark font-light'}>{opportunity.location}</div>
				</div>

				<div className={`flex flex-row flex-wrap gap-2`}>
					{opportunity.skills.map((skill, index) => {
						const skillName = SKILLS.find(s => s.id === skill.constant_id.toString())?.name!;
						if (props.userSkills.includes(skillName)) return <SkillsOrBackgroundChip value={skillName}
																					   highlighted={true}/>
						return <SkillsOrBackgroundChip value={skillName} highlighted={false}/>
					})}
					{opportunity.backgrounds.map((background, index) => {
						const backgroundName = BACKGROUNDS.find(b => b.id === background.constant_id.toString())?.name!;
						if (props.userBackgrounds.includes(backgroundName)) return <SkillsOrBackgroundChip key={index}
																								 value={backgroundName}
																								 highlighted={true}/>
						return <SkillsOrBackgroundChip value={backgroundName} highlighted={false}/>
					})}
				</div>
			</div>
		</a>
	);
}