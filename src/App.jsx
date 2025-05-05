import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/employeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSymmary from './components/dashboard/AdminSymmary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import { EditDepartment } from './components/departments/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from "./components/salary/Add"
import ViewSalary from "./components/salary/View"
import Summary from "./components/EmployeeDashboard/Summary"
import LeaveList from './components/leave/List';
import AddLeave from "./components/leave/Add"
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import Detail from './components/leave/Detail';
import Attendance from './components/attendance/Attendance';
import AttendanceReport from './components/attendance/AttendanceReport';
import Chatbot from './components/chatbot/App';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSymmary />}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>
          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/add-employee' element={<Add />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />}></Route>

          <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>

          <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>

          <Route path='/admin-dashboard/setting' element={<Setting />}></Route>
          <Route path='/admin-dashboard/attendance' element={<Attendance />}></Route>
          <Route path='/admin-dashboard/attendance-report' element={<AttendanceReport />}></Route>

        </Route>
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />

            </RoleBasedRoutes>
          </PrivateRoutes>

        }>

          <Route index element={<Summary />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>
        </Route>
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;


//Employee Details
// [
//   {
//     "name": "Vishal Patil",
//     "email": "vishal.patil@example.com",
//     "employeeId": "EMP001",
//     "dob": "1995-06-15",
//     "gender": "Male",
//     "maritalStatus": "Single",
//     "designation": "Software Engineer",
//     "department": "IT",
//     "salary": 75000,
//     "password": "Vishal@123",
//     "role": "Employee",
//     "profileImage": "vishal_patil.jpg"
//   },
//   {
//     "name": "Amit Sharma",
//     "email": "amit.sharma@example.com",
//     "employeeId": "EMP002",
//     "dob": "1992-09-25",
//     "gender": "Male",
//     "maritalStatus": "Married",
//     "designation": "Project Manager",
//     "department": "Management",
//     "salary": 120000,
//     "password": "Amit@123",
//     "role": "Admin",
//     "profileImage": "amit_sharma.jpg"
//   },
//   {
//     "name": "Rohan Desai",
//     "email": "rohan.desai@example.com",
//     "employeeId": "EMP003",
//     "dob": "1998-02-10",
//     "gender": "Male",
//     "maritalStatus": "Single",
//     "designation": "Frontend Developer",
//     "department": "IT",
//     "salary": 68000,
//     "password": "Rohan@123",
//     "role": "Employee",
//     "profileImage": "rohan_desai.jpg"
//   },
//   {
//     "name": "Sandeep Verma",
//     "email": "sandeep.verma@example.com",
//     "employeeId": "EMP004",
//     "dob": "1990-11-05",
//     "gender": "Male",
//     "maritalStatus": "Married",
//     "designation": "HR Manager",
//     "department": "HR",
//     "salary": 95000,
//     "password": "Sandeep@123",
//     "role": "Admin",
//     "profileImage": "sandeep_verma.jpg"
//   },
//   {
//     "name": "Prakash Joshi",
//     "email": "prakash.joshi@example.com",
//     "employeeId": "EMP005",
//     "dob": "1997-07-20",
//     "gender": "Male",
//     "maritalStatus": "Single",
//     "designation": "Backend Developer",
//     "department": "IT",
//     "salary": 72000,
//     "password": "Prakash@123",
//     "role": "Employee",
//     "profileImage": "prakash_joshi.jpg"
//   }
// ]

// Department
// [
//   {
//     "dep_name": "IT",
//     "description": "Responsible for software development, network management, and technical support."
//   },
//   {
//     "dep_name": "HR",
//     "description": "Handles recruitment, employee relations, payroll, and company policies."
//   },
//   {
//     "dep_name": "Finance",
//     "description": "Manages budgeting, financial planning, and company expenditures."
//   },
//   {
//     "dep_name": "Marketing",
//     "description": "Focuses on brand management, advertising, and market research to drive business growth."
//   },
//   {
//     "dep_name": "Operations",
//     "description": "Oversees business processes, supply chain management, and operational efficiency."
//   },
//   {
//     "dep_name": "Management",
//     "description": "Responsible for strategic planning, decision-making, and overall business leadership."
//   }
// ]
