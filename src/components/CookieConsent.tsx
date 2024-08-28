"use client"

import {Modal} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import {useEffect, useState} from "react";
import {HotjarSnippet} from "@/components/HotJar";


export default function CookieConsent() {
	const [opened, cookieBanner] = useDisclosure(false);
	const [cookieConsent, setCookieConsent] = useState(false);

	useEffect(() => {
		if(localStorage.getItem("cookies_accepted")){
			setCookieConsent(!localStorage.getItem("cookies_accepted"));
		} else {
			cookieBanner.open();
		}
	}, [])

	function acceptCookies(){
		localStorage.setItem("cookies_accepted", "true");
		setCookieConsent(true);
		cookieBanner.close();
	}

	function rejectCookies() {
		localStorage.setItem("cookies_accepted", "false");
		setCookieConsent(false);
		cookieBanner.close();
	}

	return (
		<>
			<Modal opened={opened} onClose={cookieBanner.close} centered withCloseButton={false} closeOnClickOutside={false}>
				<div className={`flex flex-col space-y-5`}>
					<div className={`text-xl font-bold`}>Cookie Consent</div>
					<div>
						AIESEC International Inc. requests your consent to store cookies on your terminal equipment and to collect
						information from your terminal equipment for the purposes of improving its services and tailoring the
						marketing you see on apps and other websites. You can change your mind by clicking the ‘Cookies’ button.
					</div>
					<div className={`flex flex-row space-x-5`}>
						<div className="w-48 bg-aiesec-blue border-solid border-2 border-aiesec-blue p-3 text-white font-bold rounded-md item text-center cursor-pointer hover:opacity-80 transition-all duration-300" onClick={acceptCookies}>ACCEPT COOKIES</div>
						<div className="w-48 bg-light-gray border-solid border-2 border-gray p-3 font-bold rounded-md item text-center text-gray cursor-pointer hover:opacity-80 transition-all duration-300" onClick={rejectCookies}>REJECT COOKIES</div>
					</div>
				</div>

			</Modal>

			{ cookieConsent &&
				<HotjarSnippet/>
			}
		</>
	);
}