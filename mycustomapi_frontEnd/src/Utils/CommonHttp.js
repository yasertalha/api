import Content from './content.json'

export async function postHttp(urlSuffix, body) {
    return fetch(`${Content.baseUrl}${urlSuffix}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    })
        .then((response) => response.json())
        .then((json) => json.secretID)
        .catch((err) => {
            console.log("Request Failed", err);
            return false
        });
}