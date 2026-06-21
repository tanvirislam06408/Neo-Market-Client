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
   
    const res=await serverMutation(`/api/seller-edit?id=${id}`,data,'PATCH');
    revalidatePath('/dashboard/seller/products')
    return res;
}

// delete products
export const deleteProduct=async(id)=>{
    const res=await serverMutation(`/api/seller-delete?id=${id}`,null,'DELETE');
    revalidatePath('/dashboard/seller/products')
    return res;
}


export const adminDeleteProduct=async(id)=>{
    const res=await serverMutation(`/delete-product?id=${id}`,null,'DELETE');
    revalidatePath('/dashboard/admin/products')
    return res;
}