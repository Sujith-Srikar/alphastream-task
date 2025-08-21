import { useEntitlement } from "../context/EntitlementContext";
import { AppLayout } from "../components";

function Dashboard() {
    const {isLoading, error} = useEntitlement();

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
