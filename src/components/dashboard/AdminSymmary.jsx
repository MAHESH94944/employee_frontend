import {
    FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf,
    FaMoneyBillWave, FaTimesCircle, FaUsers
} from "react-icons/fa"
import SummaryCard from "./SummaryCard"
import { useEffect, useState } from "react"
import axios from "axios"

const AdminSymmary = () => {
    const [summary, setSummary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get("https://employee-api-pi-nine.vercel.app/api/dashboard/summary", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                setSummary(response.data)
            } catch (error) {
                if (error.response) alert(error.response.data.error)
                console.error(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchSummary()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mb-4" />
                    <p className="text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 lg:px-16 lg:py-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800">📊 Dashboard Overview</h1>
                    <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's your organization’s current status.</p>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <SummaryCard
                        icon={<FaUsers className="text-white text-3xl" />}
                        text="Total Employees"
                        number={summary.totalEmployees}
                        color="from-blue-600 to-indigo-700"
                        trend="up"
                    />
                    <SummaryCard
                        icon={<FaBuilding className="text-white text-3xl" />}
                        text="Total Departments"
                        number={summary.totalDepartments}
                        color="from-purple-600 to-pink-600"
                        trend="stable"
                    />
                    <SummaryCard
                        icon={<FaMoneyBillWave className="text-white text-3xl" />}
                        text="Monthly Salary"
                        number={`$${summary.totalSalary.toLocaleString()}`}
                        color="from-emerald-600 to-green-400"
                        trend="down"
                    />
                </div>

                {/* Leave Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-10 transition hover:shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">📝 Leave Management</h2>
                        <p className="text-gray-500 mt-1">Current leave status across your organization</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SummaryCard
                            icon={<FaFileAlt className="text-white text-2xl" />}
                            text="Leave Applied"
                            number={summary.leaveSummary.appliedFor}
                            color="from-sky-500 to-blue-600"
                        />
                        <SummaryCard
                            icon={<FaCheckCircle className="text-white text-2xl" />}
                            text="Leave Approved"
                            number={summary.leaveSummary.approved}
                            color="from-green-500 to-emerald-600"
                        />
                        <SummaryCard
                            icon={<FaHourglassHalf className="text-white text-2xl" />}
                            text="Leave Pending"
                            number={summary.leaveSummary.pending}
                            color="from-yellow-500 to-amber-500"
                        />
                        <SummaryCard
                            icon={<FaTimesCircle className="text-white text-2xl" />}
                            text="Leave Rejected"
                            number={summary.leaveSummary.rejected}
                            color="from-rose-500 to-pink-600"
                        />
                    </div>
                </div>

               
            </div>
        </div>
    )
}

export default AdminSymmary
