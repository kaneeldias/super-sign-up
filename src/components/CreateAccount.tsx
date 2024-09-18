"use client"

import ContainerBox from "@/components/Container/ContainerBox";
import ContainerHeader from "@/components/Container/ContainerHeader";
import React, {useEffect} from "react";
import Button from "@/components/Inputs/Button";

const OAUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/oauth/authorize`;

type Props = {
    setUserCreated: (value: boolean) => void;
}

export default function CreateAccount(props: Props) {
    const [accessToken, setAccessToken] = React.useState<string | null>(null);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        setAccessToken(access_token);
        if (access_token) {
            props.setUserCreated(true);
        }
    }, []);

    function getOauthUrl() {
        return `${OAUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI as string)}&response_type=code`;
    }

    function pollForLogin() {
        const interval = setInterval(() => {
            fetch(`/auth/accessToken`).then(res => res.json()).then(data => {
                if (data.access_token) {
                    clearInterval(interval);
                    props.setUserCreated(true);
                }
            });
        }, 1000);
    }

    return (
        <ContainerBox borderColor={"border-aiesec-blue"} className={`min-w-[700px]`}>
            <ContainerHeader
                title={"You need to create an account to view opportunities"}
                subtitle={""}
            />

            <div>
                { !accessToken &&
                    <a href={"#"} target={"_blank"}><Button onClick={pollForLogin}>Create an account with AIESEC</Button></a>
                }
            </div>
        </ContainerBox>
    )
}