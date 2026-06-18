'use server'
const baseUrl = process.env.NEXT_PUBLIC_SERVER

export const serverMutation = async (url, data) => {
    const res = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}