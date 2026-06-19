import { headers } from "next/headers";
import { auth } from "../auth";
import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";

export const wishList = async () => {
    

    const user = await getUserSession();
    const res = await protectedFetch(`/api/wish-list?userId=${user?.id}`)
    return res;
}