import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, ChevronDown, User } from "lucide-react";


function LogoutButton(){

    const navigate = useNavigate();

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const [user,setUser] = useState(null);
    const [open,setOpen] = useState(false);



    useEffect(()=>{

        fetchUser();

    },[]);



    const fetchUser = async()=>{

        try{

            const response = await axios.get(
                `http://localhost:8000/user/${user_id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setUser(response.data);


        }
        catch(error){

            console.log(error);

        }

    };




    const handleLogout = ()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");


        toast.success("Logged out successfully");

        navigate("/login");

    };




return (

<div className="relative">


{/* Profile Button */}

<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
bg-white
px-3
py-2
rounded-2xl
shadow-md
border
border-gray-200
hover:shadow-lg
transition
"


>


{/* Avatar */}

<div

className="
w-11
h-11
rounded-full
bg-gradient-to-br
from-indigo-500
to-purple-600
text-white
flex
items-center
justify-center
font-bold
text-lg
"

>

{
user?.name
?
user.name.charAt(0).toUpperCase()
:
"U"
}


</div>



<div className="text-left hidden md:block">


<p className="
font-semibold
text-gray-800
text-sm
">

{user?.name || "Loading..."}

</p>


<p className="
text-xs
text-gray-500
">

{user?.role|| "Loading..."}

</p>


</div>



<ChevronDown 
size={18}
className="
text-gray-500
"
/>


</button>





{/* Dropdown */}

{

open &&

<div
className="
absolute
right-0
mt-3
w-48
bg-white
rounded-2xl
shadow-xl
border
border-gray-200
p-4
z-50
"
>

<button

onClick={handleLogout}

className="
w-full
flex
items-center
justify-center
gap-3
bg-red-600
hover:bg-red-700
text-white
py-3
rounded-xl
font-semibold
transition
"

>

<LogOut size={18}/>

Logout

</button>


</div>


}



</div>

);


}


export default LogoutButton;