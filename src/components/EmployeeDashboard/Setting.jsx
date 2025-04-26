import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";


const Setting = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",

    })

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target
        setSetting({ ...setting, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password does not match");
        } else {
            try {
                const response = await axios.put("http://localhost:5000/api/setting/change-password", setting, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                // console.log("Password change response:", response.data);
                // console.log("Before password change:", localStorage.getItem("token"));

                if (response.data.success) {
                    // alert("Password changed successfully. Please log in again."); // Show success message
                    // localStorage.removeItem("token"); // Clear old token
                    navigate("/login"); // Redirect to login
                    setError("")
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };


    return (
        <div
            className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md mt-10 w-96"
        >
            <h2 className="text-2xl font-bold mb-6">
                Change Password
            </h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>

                <div>
                    <label className="text-sm font-medium text-gray-700">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Change Password"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>


                <div>
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >Change Password</button>
            </form>
        </div>
    )
}

export default Setting