import {Routes, Route} from "react-router"
import { UserProvider } from "./context/UserContext"
import { Home, Dashboard } from "./pages"
import { AdminDashboard } from "./components"

function App() {

  return (
    <div className="w-full h-screen">
      
      <UserProvider>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/admin' element={<AdminDashboard />}/>
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App
