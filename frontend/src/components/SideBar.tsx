import React, {useState, useEffect} from 'react'

function SideBar() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [sideBarData, setSideBarData] = useState({})

  useEffect(() => {

  }, [])

  return (
    <div className='w-[10vw] bg-white text-black'>
      <h1>Documents</h1>
      
    </div>
  )
}

export default SideBar