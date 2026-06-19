'use server'
const baseUrl = process.env.NEXT_PUBLIC_SERVER

export const serverMutation = async (url, data = null , method='POST') => {
    const res = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: data && JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}

