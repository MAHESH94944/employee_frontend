// AdminSidebar.jsx
import { NavLink } from 'react-router-dom'
import { FaFileAlt, FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaRegCalendarAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { AiOutlineFileText } from 'react-icons/ai'
const AdminSidebar = () => {
    return (
        <div className='bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl'>
            <div className='bg-gradient-to-r from-teal-600 to-emerald-500 h-16 flex items-center justify-center shadow-md'>
                <h3 className='text-2xl text-center font-pacific tracking-wider animate-pulse'>Employee MS</h3>
            </div>
            <div className='p-4 space-y-1 mt-4'>
                <NavLink to="/admin-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
                    end
                >
                    <FaTachometerAlt className="text-lg" />
                    <span className="font-medium">Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaUsers className="text-lg" />
                    <span className="font-medium">Employees</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaBuilding className="text-lg" />
                    <span className="font-medium">Departments</span>
                </NavLink>

                <NavLink to="/admin-dashboard/leaves"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaCalendarAlt className="text-lg" />
                    <span className="font-medium">Leaves</span>
                </NavLink>

                <NavLink to="/admin-dashboard/salary/add"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaMoneyBillWave className="text-lg" />
                    <span className="font-medium">Salary</span>
                </NavLink>

                <NavLink to={"/admin-dashboard/attendance"}
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaRegCalendarAlt className="text-lg" />
                    <span className="font-medium">Attendance</span>
                </NavLink>

                <NavLink to={"/admin-dashboard/attendance-report"}
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <AiOutlineFileText className="text-lg" />
                    <span className="font-medium">Attendance Report</span>
                </NavLink>

                <NavLink to="http://localhost:5174"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaFileAlt className="text-lg" />
                    <span className="font-medium">Resume Analyzer</span>
                </NavLink>

                <NavLink to="/admin-dashboard/setting"
                    className={({ isActive }) => `${isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-gray-700 hover:text-emerald-300"} flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md`}>
                    <FaCogs className="text-lg" />
                    <span className="font-medium">Setting</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar