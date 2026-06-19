'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const cancelOrder = async (id) => {
    const res = await serverMutation(`/api/orders?productId=${id}`, null, 'DELETE');
    revalidatePath('/dashboard/orders/buyer')
    return res;
}