'use server'
import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";
import { revalidatePath } from "next/cache";

export const wishList = async () => {
    

    const user = await getUserSession();
    const res = await protectedFetch(`/api/wish-list?userId=${user?.id}`)
    
    return res;
}