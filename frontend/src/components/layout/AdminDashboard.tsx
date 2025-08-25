import { updateUserEntitlement, updateClientEntitlement } from "../../api/adminApi";
import { useUser } from "../../context/UserContext";

function AdminDashboard(){
    const {userId} = useUser();

    return (
        <>
            <div>Admin Dashboard</div>
        </>
    )
}

export default AdminDashboard;