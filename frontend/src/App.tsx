import {Routes, Route} from "react-router"
import { UserProvider } from "./context/UserContext"
import { Home, Dashboard } from "./pages"
import { EntitlementContextProvider } from "./context/EntitlementContext"

function App() {

  return (
    <div className="w-full h-screen">
      
      <UserProvider>
        <EntitlementContextProvider>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
        </EntitlementContextProvider>
      </UserProvider>
    </div>
  )
}

export default App
