import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;
    const {user} = useAuth()

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`https://employee-api-nfro.vercel.app/api/salary/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    }

    useEffect(() => {
        fetchSalaries();
    }, []);
    const filterSalaries = (event) => {
        const q = event.target.value;
        if (!q) {
            setFilteredSalaries(salaries);
            return;
        }

        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
        );

        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries === null ? (<div>Loading...</div>) : (
                <div className='overflow-x-auto p-5'>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input type="text"
                            placeholder='Search by Employee ID'
                            className='border border-gray-300 rounded-md px-2 py-0.5'
                            onChange={filterSalaries}
                        />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                                <tr>
                                    <th className='px-6 py-3'>SNO</th>
                                    <th className='px-6 py-3'>Emp ID</th>
                                    <th className='px-6 py-3'>Salary</th>
                                    <th className='px-6 py-3'>Allowance</th>
                                    <th className='px-6 py-3'>Deduction</th>
                                    <th className='px-6 py-3'>Total</th>
                                    <th className='px-6 py-3'>Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => {
                                    return <tr
                                        key={salary.id}
                                        className='bg-white text-gray-700 uppercase bg-gray-50 border border-gray-200'
                                    >
                                        <td className='px-6 py-3'>{sno++}</td>
                                        <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                        <td className='px-6 py-3'>
                                            {salary.basicSalary}
                                        </td>
                                        <td className='px-6 py-3'>
                                            {salary.allowances}
                                        </td>
                                        <td className='px-6 py-3'>{salary.deductions}</td>
                                        <td className='px-6 py-3'>{salary.netSalary}</td>
                                        <td className='px-6 py-3'>
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    ) : <div>No Records</div>}
                </div>
            )}
        </>
    )
}

export default View