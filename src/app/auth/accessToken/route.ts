import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const at = cookies().get("access_token");
    const rt = cookies().get("refresh_token");
    const ei = cookies().get("access_token_expiration");

    if (at && at.value && at.value !== "" && at.value !== null) {
        return NextResponse.json({
            access_token: at.value,
            refresh_token: rt?.value,
            access_token_expiration: ei?.value
        })
    }
    return NextResponse.json({
        error: "No access token found"
    }, {status: 401});
}