
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false);
    const [filterEmployee, setFilerEmployee] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("https://employee-api-pi-nine.vercel.app/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img
                                width={50}
                                className='rounded-full'
                                src={emp.userId.profileImage || 'https://via.placeholder.com/50'}
                                alt="Profile"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/50';
                                }}
                            />
                        ),
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));

                    setEmployees(data);
                    setFilerEmployee(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployee();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => {
            return emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilerEmployee(records)
    }

    return (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search by Emp Name" className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filterEmployee} pagination />
            </div>
        </div>
    )
}

export default List












// import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
// import DataTable from 'react-data-table-component'

// const List = () => {
//     const [employees, setEmployees] = useState([])
//     const [empLoading, setEmpLoading] = useState(false);

//     const [filterEmployee, setFilerEmployee] = useState([]);


//     useEffect(() => {
//         const fetchEmployee = async () => {
//             setEmpLoading(true);
//             try {
//                 const response = await axios.get("https://employee-api-pi-nine.vercel.app/api/employee", {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 if (response.data.success) {
//                     let sno = 1;
//                     const data = response.data.employees.map((emp) => ({
//                         _id: emp._id,
//                         sno: sno++,
//                         dep_name: emp.department.dep_name,
//                         name: emp.userId.name,
//                         dob: new Date(emp.dob).toLocaleDateString(),
//                         profileImage: <img width={50} className='rounded-full' src={`https://employee-api-pi-nine.vercel.app/${emp.userId.profileImage}`} />,
//                         action: (<EmployeeButtons Id={emp._id} />), // Pass ID if required
//                     }));

//                     setEmployees(data);
//                     setFilerEmployee(data);
//                 }
//             } catch (error) {
//                 if (error.response && !error.response.data.success) {
//                     alert(error.response.data.error);
//                 }
//             } finally {
//                 setEmpLoading(false);
//             }
//         };

//         fetchEmployee();
//     }, []);

//     const handleFilter = (e) => {
//         const records = employees.filter((emp) => {
//             return emp.name.toLowerCase().includes(e.target.value.toLowerCase())
//         })
//         setFilerEmployee(records)
//     }

//     return (
//         <div className='p-6'>
//             <div className="text-center">
//                 <h3 className="text-2xl font-bold">Manage Employee</h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input type="text" placeholder="Search by Emp Name" className="px-4 py-0.5 border"
//                     onChange={handleFilter}
//                 />
//                 <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
//             </div>
//             <div className='mt-6'>
//                 <DataTable columns={columns} data={filterEmployee} pagination />
//             </div>
//         </div>
//     )
// }

// export default List
