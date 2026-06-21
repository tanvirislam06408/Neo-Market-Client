'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const userStatusUpdate = async (data) => {
    const res = await serverMutation(`/block-user`, data, 'PATCH');
    revalidatePath('/dashboard/admin/users')
    return res;

}


export const updateRole = async (data) => {
    const res = await serverMutation('/update-role', data, 'PATCH');
    revalidatePath('/dashboard/admin/users')
    return res;
}

export const deleteUser = async (id) => {
    const res = await serverMutation(`/delete-user?id=${id}`, null, 'DELETE');
    return res
}


export const updateProductStatus = async (data) => {
    const res=await serverMutation('/updateStatus',data,'PATCH');
    revalidatePath('/dashboard/admin/products')
    return res;
}