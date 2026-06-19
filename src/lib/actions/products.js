'use server'
import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/serverMutation"
import { getUserSession } from "../core/session"

export const addProducts=async(data)=>{
    const res=await serverMutation('/api/products',data)
    return res
}


// update seller product
export const updateProduct=async(id,data)=>{
   
    const res=serverMutation(`/api/seller-edit?id=${id}`,data,'PATCH');
    revalidatePath('/dashboard/seller/products')
    return res;
}