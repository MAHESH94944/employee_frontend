import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx"
import AdminSymmary from "../components/dashboard/AdminSymmary.jsx"
import Navbar from "../components/dashboard/Navbar.jsx"
import { useAuth } from "../context/authContext.jsx"

const AdminDashboard = () => {
  const { user } = useAuth()



  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard