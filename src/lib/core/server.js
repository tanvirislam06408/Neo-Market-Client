import { getToken } from "./jwtToke";

const baseUrl = process.env.NEXT_PUBLIC_SERVER

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    const resData = await res.json()
    return resData;
}

export const protectedFetch = async (path) => {
    const token=await getToken()
   
    
    const res = await fetch(`${baseUrl}${path}`,{
        method: 'GET',
        headers:{
            authorization: `Bearer ${token.token}`,
            'content-type':'application/json'

        },

    });
    const resData = await res.json()
    return resData;

}