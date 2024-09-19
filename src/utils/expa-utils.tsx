import {cookies} from "next/headers";

export async function getPersonId(): Promise<number> {
    const query = `
        {
            currentPerson {
                id
            }
        }
    `

    const response = await fetch("https://gis-api.aiesec.org/graphql", {
        method: "POST",
        body: JSON.stringify({query}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": cookies().get("access_token")?.value!
        }
    });

    return (await response.json()).data.currentPerson.id;
}
