'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const addToWishList=async(data)=>{
    const res=await serverMutation('/api/wish-list',data)
    return res;
}

export const deleteItems=async(id)=>{
    const res=await serverMutation(`/api/wish-list?_id=${id}`, null,'DELETE');
    revalidatePath('/dashboard/buyer/wishlist')
    return res;
}