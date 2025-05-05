import { useEffect, useState } from "react"
import axios from "axios"
const AttendanceReport = () => {

    const [report, setReport] = useState({})
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [dateFilter, setDateFilter] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null); // State to store error messages

    const fetchReport = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error state
            const query = new URLSearchParams({ limit, skip });
            if (dateFilter) {
                query.append("date", dateFilter);
            }
            const response = await axios.get(`https://employee-api-pi-nine.vercel.app/api/attendance/report?${query.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                if (skip === 0) {
                    setReport(response.data.groupData);
                } else {
                    setReport((prevData) => ({ ...prevData, ...response.data.groupData }));
                }
            }
            setLoading(false);
        } catch (error) {
            setError(error.message); // Set error message
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    const handleLoadMore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div className="min-h-screen p-10 bg-white">
            <h2 className="text-center text-2xl font-bold">Attendance Report</h2>
            <div>
                <h2 className="text-xl font-semibold"> Filter by Date</h2>
                <input
                    type="date"
                    className="border bg-gray-100"
                    value={dateFilter || ""}
                    onChange={(e) => {
                        setDateFilter(e.target.value)
                        setSkip(0); // Reset skip when date filter changes
                    }}

                />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                Object.entries(report).map(([date, record]) => (
                    <div className="mt-4 border-b" key={date}>
                        <h2 className="text-xl font-semibold">{date}</h2>
                        <table className="" border="1" cellPadding="10">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.map((data, idx) => (
                                    <tr key={data.employeeId}>
                                        <td>{idx + 1}</td>
                                        <td>{data.employeeId}</td>
                                        <td>{data.employeeName}</td>
                                        <td>{data.departmentName}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
            <button
                className="px-4 py-2 border bg-gray-100 text-lg font-semibold"
                onClick={handleLoadMore}
                disabled={
                    loading ||
                    Object.keys(report).length === 0 ||
                    Object.values(report).flat().length === 0 // Ensure no data exists in the report
                }
            >
                Load More
            </button>
        </div>
    );
};

export default AttendanceReport;
