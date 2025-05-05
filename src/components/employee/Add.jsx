import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear any previous errors when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === "dob") {
      if (value) {
        const isValidAge = validateAge(value);
        if (!isValidAge) {
          setErrors(prev => ({
            ...prev,
            [name]: "Employee must be at least 18 years old"
          }));
        }
      }
    }

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields before submission
    const requiredFields = [
      'name', 'email', 'employeeId', 'dob', 'gender',
      'maritalStatus', 'designation', 'department',
      'salary', 'password', 'role'
    ];

    const newErrors = {};
    let isValid = true;

    // Check for empty required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Special validation for date of birth
    if (formData.dob && !validateAge(formData.dob)) {
      newErrors.dob = "Employee must be at least 18 years old";
      isValid = false;
    }

    // Validate email format if present
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate salary is positive number
    if (formData.salary && (isNaN(formData.salary) || formData.salary <= 0)) {
      newErrors.salary = "Please enter a valid salary amount";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) { // Only append if value exists
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('https://employee-api-nfro.vercel.app/api/employee/add', formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        // Handle specific backend validation errors
        if (error.response.data.error.includes("email")) {
          setErrors(prev => ({
            ...prev,
            email: error.response.data.error
          }));
        } else if (error.response.data.error.includes("employee ID")) {
          setErrors(prev => ({
            ...prev,
            employeeId: error.response.data.error
          }));
        } else {
          alert(error.response.data.error);
        }
      } else {
        alert("An error occurred while adding the employee");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Employee</h2>
        <p className="text-gray-500 mt-1">Fill in the details below to add a new employee</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="John Doe"
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Employee ID */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="EMP-001"
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.employeeId ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
            />
            {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
          </div>

          {/* Date of Birth with Age Validation */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} // Set max date to 18 years ago
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.dob ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none text-gray-700`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.gender ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3M2I4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Marital Status */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Marital Status <span className="text-red-500">*</span>
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.maritalStatus ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3M2I4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]`}
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
          </div>

          {/* Designation */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Software Engineer"
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.designation ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
          </div>

          {/* Department */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              onChange={handleChange}
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.department ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3M2I4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]`}
            >
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          {/* Salary */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Salary <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="50000"
                min="0"
                step="0.01"
                className={`mt-1 pl-8 pr-4 py-2.5 block w-full border ${errors.salary ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
              />
            </div>
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              minLength="8"
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              onChange={handleChange}
              className={`mt-1 px-4 py-2.5 block w-full border ${errors.role ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3M2I4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]`}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin-dashboard/employees")}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors duration-200 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;