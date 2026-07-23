import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {


const [formData,setFormData]=useState({

    name:"",
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



if(formData.password.length < 8){

    toast.error(
        "Password must be at least 8 characters long"
    );

    return;

}



try{


await axios.post(

    "http://localhost:8000/user/create",

    formData

);



toast.success(
    "Account created successfully"
);



}
catch(error){
    if(error.response && error.response.status === 429) {
        toast.error("Too many signup attempts. Please try again later.");
        return;
    }


console.log(error);


toast.error(
    error.response?.data?.detail ||
    "Signup failed"
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


{/* background blur */}

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
">


</div>



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
">

</div>





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





<div className="text-center mb-8">


<h1 className="
text-4xl
font-bold
text-white
">

Create Account

</h1>



<p className="
text-blue-200
mt-3
">

Join our learning platform

</p>


</div>





<form onSubmit={handleSubmit}>


{/* Name */}

<div className="mb-5">


<label className="
text-sm
text-blue-100
">

Full Name

</label>



<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Enter your name"

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

required

/>


</div>





{/* Email */}

<div className="mb-5">


<label className="
text-sm
text-blue-100
">

Email Address

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

required

/>


</div>






{/* Password */}

<div className="mb-6">


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

placeholder="Create password"

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

required

/>



</div>







<button

type="submit"

className="
w-full
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

Create Account

</button>



</form>







<p className="
text-center
mt-8
text-blue-100
">


Already have an account?


<Link

to="/login"

className="
ml-2
font-semibold
text-white
hover:text-blue-300
"

>

Login

</Link>


</p>





</div>




</div>


)


}


export default Signup;