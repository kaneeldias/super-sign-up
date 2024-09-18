import {NextRequest, NextResponse} from "next/server";
import {getAccessTokenFromOauth, GetTokenResponse} from "@/utils/auth-utils";

export async function GET(request: NextRequest) {
    const code: string = request.nextUrl.searchParams.get("code") as string;
    const authResponse: GetTokenResponse = await getAccessTokenFromOauth(code);

    const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/close`;
    console.log("Redirect URI:", redirect_uri);

    const response = NextResponse.redirect(redirect_uri, {status: 302})

    response.cookies.set("access_token", authResponse.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: authResponse.expires_in
    });
    response.cookies.set("refresh_token", authResponse.refresh_token, {
        httpOnly: true,
        secure: true,
    });

    const expiryTime = new Date().getTime() + authResponse.expires_in * 1000;

    response.cookies.set("access_token_expiration", expiryTime.toString(), {
        httpOnly: true,
        secure: true,
        maxAge: authResponse.expires_in
    });

    return response;
}