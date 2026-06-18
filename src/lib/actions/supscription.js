import { serverMutation } from "../core/serverMutation"


export const createAOrder=async(data)=>{
    const postOrder=await serverMutation('/api/order',data);
    return postOrder;
    
}