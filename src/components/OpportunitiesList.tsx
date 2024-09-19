"use client"

import React, {useEffect} from "react";
import ContainerBox from "@/components/Container/ContainerBox";
import ContainerHeader from "@/components/Container/ContainerHeader";
import SkillsOrBackgroundComponent from "@/components/SkillsOrBackgroundComponent/SkillsOrBackgroundComponent";
import {SKILLS} from "@/schemas/skills";
import {BACKGROUNDS} from "@/schemas/backgrounds";
import {Opportunity} from "@/schemas/opportunities";
import OpportunityCard from "@/components/OpportunityCard";
import OpportunitiesLoader from "@/components/Loaders/OpportunitiesLoader";
import {Button} from "@mantine/core";
import {CvInfo, WorkExperience} from "@/schemas/cv_info";
import {COUNTRIES} from "@/schemas/country";

type Props = {
	cvFile: File | null;
	cvInfo: CvInfo;
}

export default function OpportunitiesList(props: Props) {
	const [skills, setSkills] = React.useState<string[]>([]);
	const [backgrounds, setBackgrounds] = React.useState<string[]>([]);
	const [opportunities, setOpportunities] = React.useState<Opportunity[]>([]);
	const [showRefresh, setShowRefresh] = React.useState<boolean>(false);
	const [nationalities, setNationalities] = React.useState<string[]>([]);

	React.useEffect(() => {
		if (props.cvFile) {
			const formData = new FormData();
			formData.append("file", props.cvFile);

			fetch("/api/cv/skillsAndBackgrounds", {
				method: "POST",
				body: formData
			}).then(async res => {
				const data = await res.json();
				setSkills(data.data.skills);
				setBackgrounds(data.data.backgrounds);
				setNationalities(data.data.nationalities);
				updateUserSkills(data.data.skills);
				updateUserWorkExperience(props.cvInfo.work_experience);
				loadOpportunities(data.data.skills, data.data.backgrounds, data.data.nationalities);
			});
		}
	}, []);

	useEffect(() => {
		setShowRefresh(true);
	}, [skills, backgrounds, nationalities]);

	function addSkill(skill: string) {
		setSkills([skill, ...skills]);
	}

	function removeSkill(skill: string) {
		setSkills(skills.filter(s => s !== skill));
	}

	function addBackground(background: string) {
		setBackgrounds([background, ...backgrounds]);
	}

	function removeBackground(background: string) {
		setBackgrounds(backgrounds.filter(b => b !== background));
	}

	function loadOpportunities(skills: string[], backgrounds: string[], nationalities: string[]) {
		console.log(skills, backgrounds, nationalities);
		setOpportunities([]);

		let skillIds = skills.map(skill => SKILLS.find(s => s.name === skill)?.id);
		//remove empty values
		skillIds = skillIds.filter(id => id !== undefined);

		let backgroundIds = backgrounds.map(background => BACKGROUNDS.find(b => b.name === background)?.id);
		//remove empty values
		backgroundIds = backgroundIds.filter(id => id !== undefined);

		let nationalityIds = nationalities.map(nationality => COUNTRIES.find(c =>	c.name === nationality)?.id);
		//remove empty values
		nationalityIds = nationalityIds.filter(id => id !== undefined);

		console.log(skillIds, backgroundIds);

		fetch(`/api/cv/opportunities`, {
			method: "POST",
			body: JSON.stringify({
				skill_ids: skillIds,
				background_ids: backgroundIds,
				nationality_ids: nationalityIds
			}),
			headers: {
				"Content-Type": "application/json",
			}
		}).then(async res => {
			const data = await res.json();
			setOpportunities(data);
		}).finally(() => {
			setShowRefresh(false);
		});
	}

	function updateUserSkills(skills: string[]) {
		let skillIds = skills.map(skill => SKILLS.find(s => s.name === skill)?.id);
		//remove empty values
		skillIds = skillIds.filter(id => id !== undefined);

		fetch(`/api/cv/updateSkills`, {
			method: "POST",
			body: JSON.stringify({skills: skillIds}),
			headers: {
				"Content-Type": "application/json",
			}
		}).then(async res => {
			const data = await res.json();
			console.log(data);
		});
	}

	function updateUserWorkExperience(workExperience: WorkExperience[]) {
		fetch(`/api/cv/updateWorkExperience`, {
			method: "POST",
			body: JSON.stringify({workExperience}),
			headers: {
				"Content-Type": "application/json",
			}
		}).then(async res => {
			const data = await res.json();
			console.log(data);
		});
	}

	return (
		<>
		{ opportunities && opportunities.length > 0 &&
			<ContainerBox borderColor={"border-aiesec-blue"} className={`w-[700px]`}>
				<ContainerHeader
					title={"Opportunities for you"}
					subtitle={"Based on your resume, these are the opportunities which we think suit you best"}
				/>

				<div className={`flex flex-col space-y-5`}>
					<SkillsOrBackgroundComponent type={"skills"} items={skills} setItems={setSkills}/>
					<SkillsOrBackgroundComponent type={"backgrounds"} items={backgrounds} setItems={setBackgrounds}/>
					<SkillsOrBackgroundComponent type={"nationalities"} items={nationalities} setItems={setNationalities}/>
				</div>

				<div className={`flex flex-col space-y-10`}>
					{opportunities.map((opportunity, index) => (
						<OpportunityCard key={index} opportunity={opportunity} userSkills={skills} userBackgrounds={backgrounds}
										 addSkill={addSkill} removeSkill={removeSkill} addBackground={addBackground} removeBackground={removeBackground}
						/>
					))}
				</div>
			</ContainerBox>
		}

		{!opportunities || opportunities.length === 0 &&
			<OpportunitiesLoader/>
		}

			{ showRefresh && opportunities.length > 0 &&
				<div className={`flex flex-row mt-5 fixed bottom-10 left-0 items-center w-full justify-center`}>
					<div className={`flex flex-row shadow-black drop-shadow-lg`}>
						<Button size={"lg"} color={"green"} onClick={() => loadOpportunities(skills, backgrounds, nationalities)}>Refresh</Button>
					</div>
				</div>
			}
	</>

	);
}