import ProductButton from "@/components/ProductButton";
import {getOauthUrl} from "@/utils/auth-client-utils";
import {useEffect} from "react";

type Props = {
	setAnswer: (answer: any) => void;
}

export default function ForceSignUp(props: Props) {
	useEffect(() => {
		checkForLogin();
	}, []);

	function checkForLogin() {
		fetch(`/auth/accessToken`).then(res => res.json()).then(data => {
			if (data.access_token) {
				props.setAnswer(true);
			}
		});
	}

	function pollForLogin() {
		const interval = setInterval(() => {
			fetch(`/auth/accessToken`).then(res => res.json()).then(data => {
				if (data.access_token) {
					clearInterval(interval);
					props.setAnswer(true);
				}
			});
		}, 1000);
	}


	return (
			<a href={getOauthUrl()} target="_blank"><ProductButton onClick={() => pollForLogin()}/></a>
	);
}