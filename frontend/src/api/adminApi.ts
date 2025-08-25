import axios from "axios"


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


async function updateUserEntitlement(userId: string, requestedId: string){
    try {
        const {data} = await axios.put(`${BACKEND_URL}/user/${userId}`,
            {
                headers:{
                    "x-requester-id": requestedId
                }
            }
        );
        return data
    } catch (error) {
        console.log("Error updating user entitlement from the admin",error)
        return error;
    }
}

async function updateClientEntitlement(clientId: string, requestedId: string){
    try {
        const {data} = await axios.put(`${BACKEND_URL}/client/${clientId}`,
            {
                headers:{
                    "x-requester-id": requestedId
                }
            }
        );
        return data
    } catch (error) {
        console.log("Error updating client entitlement from the admin", error)
        return error;
    }
}

export {updateClientEntitlement, updateUserEntitlement}