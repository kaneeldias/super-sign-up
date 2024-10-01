export const OAUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/oauth/authorize`;

export function getOauthUrl() {
    return `${OAUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI as string)}&response_type=code`;
}