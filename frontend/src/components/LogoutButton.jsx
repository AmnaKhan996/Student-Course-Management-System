import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function LogoutButton(){

    const navigate = useNavigate();


    const handleLogout = ()=>{

        // remove login data
        localStorage.removeItem("token");
        localStorage.removeItem("role");


        toast.success("Logged out successfully");


        // redirect to login
        navigate("/login");

    };


    return (

        <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition">Logout</button>

    );


}


export default LogoutButton;