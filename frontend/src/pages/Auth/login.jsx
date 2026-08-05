import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login(){

    const navigate = useNavigate();


    const [formData,setFormData] = useState({
        username:"",
        password:""
    });



    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{

            const response = await axios.post(
                "http://localhost:8000/user/login",
                formData
            );


            localStorage.setItem(
                "token",
                response.data.access_token
            );


            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "user_id",
                response.data.user_id
            );

            console.log("Login successful:", response.data);




            toast.success("Login successful");


            if(response.data.role==="admin"){
                navigate("/adminDashboard");
            }
            else{
                navigate("/studentDashboard");
            }


        }
        catch(error){

            if(error.response && error.response.status === 429) {
                toast.error("Too many login attempts. Please try again later.");
                return;
            }

            toast.error(
                error.response?.data?.detail ||
                "Login failed"
            );

        }

    };



return(

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-blue-900
to-indigo-900
flex
items-center
justify-center
px-6
relative
overflow-hidden
">


{/* background circles */}

<div className="
absolute
w-96
h-96
bg-blue-500
opacity-20
rounded-full
blur-3xl
top-10
left-10
"></div>


<div className="
absolute
w-96
h-96
bg-purple-500
opacity-20
rounded-full
blur-3xl
bottom-10
right-10
"></div>




<div className="
relative
w-full
max-w-md
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
shadow-2xl
p-10
">


<h1 className="
text-4xl
font-bold
text-white
text-center
">

Welcome Back

</h1>



<p className="
text-center
text-blue-200
mt-3
">

Login to manage your learning journey

</p>




<form
onSubmit={handleSubmit}
className="mt-8"
>



<div>


<label className="
text-sm
text-blue-100
">

Email

</label>


<input

type="email"

name="username"

value={formData.username}

onChange={handleChange}

placeholder="Enter your email"

className="
w-full
mt-2
px-4
py-3
rounded-xl
bg-white/20
border
border-white/30
text-white
placeholder-blue-100
outline-none
focus:ring-2
focus:ring-blue-400
"

/>

</div>





<div className="mt-5">


<label className="
text-sm
text-blue-100
">

Password

</label>



<input

type="password"

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Enter your password"

className="
w-full
mt-2
px-4
py-3
rounded-xl
bg-white/20
border
border-white/30
text-white
placeholder-blue-100
outline-none
focus:ring-2
focus:ring-blue-400
"

/>


</div>





<button

type="submit"

className="
w-full
mt-8
py-3
rounded-xl
bg-white
text-indigo-700
font-bold
text-lg
hover:bg-blue-50
transition
shadow-lg
"

>

Login

</button>



</form>




<div className="
text-center
mt-7
text-blue-100
">


Don't have an account?


<Link

to="/signup"

className="
ml-2
font-semibold
text-white
hover:text-blue-300
"

>

Signup

</Link>



</div>



</div>


</div>


)

}


export default Login;