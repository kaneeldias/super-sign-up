"use client"

import React from "react";
import {SKILLS} from "@/schemas/skills";
import SkillsOrBackgroundChip from "@/components/SkillsOrBackgroundComponent/skillOrBackgroundChip";
import {BACKGROUNDS} from "@/schemas/backgrounds";
import {Opportunity} from "@/schemas/opportunities";
import {Button, rem} from "@mantine/core";
import {IconBuilding, IconMapPin} from "@tabler/icons-react";

type Props = {
	opportunity: Opportunity;
	userSkills: string[];
	userBackgrounds: string[];
	addSkill: (skill: string) => void;
	removeSkill: (skill: string) => void;
	addBackground: (background: string) => void;
	removeBackground: (background: string) => void;
}

const locationIcon = <IconMapPin style={{ width: rem(12), height: rem(12) }} stroke={1.5} />;
const companyIcon = <IconBuilding style={{ width: rem(12), height: rem(12) }} stroke={1.5} />;


export default function OpportunityCard(props: Props) {
	const {opportunity} = props;

	return (
		// <a href={`https://aiesec.org/opportunity/${opportunity.id}`} target={"_blank"}>
		<div className={`flex flex-col space-y-5 bg-light-gray rounded-md p-5 hover:bg-opacity-10 hover:bg-aiesec-blue hover:border-aiesec-blue border-2 border-solid border-bg-dark border-opacity-20 transition-all`}>
			<div className={`flex flex-row justify-between`}>
				<div>
					<div className={`font-bold text-md`}>{opportunity.title}</div>
					<div
						className={'flex flex-row space-x-1 text-xs text-bg-dark font-light items-center'}>{locationIcon} {opportunity.location}</div>
					<div
						className={'flex flex-row space-x-1 text-xs text-bg-dark font-light items-center'}>{companyIcon} {opportunity.organisation.name}</div>
				</div>

				<a href={`https://aiesec.org/opportunity/${opportunity.id}`} target={"_blank"}>
					<Button variant={"gradient"}>Apply Now</Button>
				</a>

			</div>

			<div>
				<div className={`text-sm text-bg-dark font-light`}>{opportunity.description}</div>
			</div>

			<div className={`flex flex-row flex-wrap gap-2`}>
				{opportunity.skills.map((skill, index) => {
					const skillName = SKILLS.find(s => s.id === skill.constant_id.toString())?.name!;
					if (props.userSkills.includes(skillName)) return <SkillsOrBackgroundChip selected={true} key={index} value={skillName}
																				   highlighted={true} type={"skill"} add={props.addSkill.bind(null, skillName)} remove={props.removeSkill.bind(null, skillName)}/>
					return <SkillsOrBackgroundChip  type={"skill"} selected={false} key={index} value={skillName} highlighted={false} add={props.addSkill.bind(null, skillName)} remove={props.removeSkill.bind(null, skillName)}/>
				})}
				{opportunity.backgrounds.map((background, index) => {
					const backgroundName = BACKGROUNDS.find(b => b.id === background.constant_id.toString())?.name!;
					if (props.userBackgrounds.includes(backgroundName)) return <SkillsOrBackgroundChip key={index}
																									   type={"background"}
																									   value={backgroundName}
																									   selected={true}
																									   highlighted={true}
																									   add={props.addBackground.bind(null, backgroundName)} remove={props.removeBackground.bind(null, backgroundName)}/>
					return <SkillsOrBackgroundChip key={index} value={backgroundName} highlighted={false} type={"background"} selected={false}
													add={props.addBackground.bind(null, backgroundName)} remove={props.removeBackground.bind(null, backgroundName)}
					/>
				})}
			</div>
		</div>
);
}