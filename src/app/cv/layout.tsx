"use client"

import {useEffect} from "react";

export default function CVLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        const access_token_expiration = localStorage.getItem("access_token_expiration");

        if (!access_token || !access_token_expiration || new Date().getTime() > parseInt(access_token_expiration)) {
            fetch(`/auth/accessToken`).then(res => res.json()).then(data => {
                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    localStorage.setItem("access_token_expiration", data.access_token_expiration);
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("access_token_expiration");
                }
            });
        }    }, []);

    function fetchAccessToken() {
    }

    return (
        <div className={`flex min-h-screen min-w-screen w-full h-full bg-[#EEEEEE] text-bg-dark`}>
            {children}
        </div>
    )
}