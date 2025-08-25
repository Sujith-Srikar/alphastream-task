import { useUser } from "../context/UserContext";
import { AppLayout } from "../components";
import { useEffectiveUserEntitlement } from "../hooks/useApiHooks";

function Dashboard() {
  const {userId} = useUser();
    const {isLoading, error} = useEffectiveUserEntitlement(userId);

    if (error) return <p className="text-red-600">Error fetching Entitlements</p>;
    if (isLoading) return <p className="text-gray-500">Loading...</p>;
    
  return (
    <>
     <div>
        <AppLayout />
     </div> 
    </>
  )
}

export default Dashboard
