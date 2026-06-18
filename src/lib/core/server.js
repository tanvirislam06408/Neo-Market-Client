const baseUrl = process.env.NEXT_PUBLIC_SERVER

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    const resData=await res.json()
    return resData;
}