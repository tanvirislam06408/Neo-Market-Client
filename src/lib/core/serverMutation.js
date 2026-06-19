'use server'

import { redirect } from "next/navigation";
import { getUserSession } from "./session"
import { getToken } from "./jwtToke";

const baseUrl = process.env.NEXT_PUBLIC_SERVER


export const serverMutation = async (url, data = null, method = 'POST') => {
    const user = await getUserSession();
    if (!user) {
        redirect('/signIn')
    }
    const token=await getToken()
    const res = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
            'authorization':  `Bearer ${token.token}`,
            'content-type': 'application/json'
        },
        body: data && JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}

