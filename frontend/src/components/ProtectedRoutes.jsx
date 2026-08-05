import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute({children, allowedRole}){


    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");



    // token nahi hai

    if(!token){
        toast.error("Please login first");
        return <Navigate to="/login" />;

    }


        try {

        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        // Token expired
        if (decoded.exp < currentTime) {

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user_id");

            toast.error("Session expired. Please login again.");

            return <Navigate to="/login"/>;
        }

    } catch (error) {

        // Invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");

        return <Navigate to="/login"/>;
    }



    // role check

    if(role !== allowedRole){

        toast.error("Access denied");

        return <Navigate to="/unauthorized" />;

    }



    return children;


}


export default ProtectedRoute;