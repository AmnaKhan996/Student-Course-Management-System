import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


function ProtectedRoute({children, allowedRole}){


    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");



    // token nahi hai

    if(!token){

        return <Navigate to="/login" />;

    }



    // role check

    if(role !== allowedRole){

        toast.error("Access denied");

        return <Navigate to="/unauthorized" />;

    }



    return children;


}


export default ProtectedRoute;