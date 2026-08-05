import {useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";


function UpdateCourse({courseId}){


const token = localStorage.getItem("token");

const course_id = courseId
const [formData,setFormData]=useState({

title:"",
description:"",
duration:"",
capacity:""

});



useEffect(()=>{

fetchCourse();

},[]);



const fetchCourse=async()=>{


try{


const response=await axios.get(

`http://localhost:8000/course/admin/${courseId}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setFormData({

title:response.data.title,

description:response.data.description,

duration:response.data.duration,

capacity:response.data.capacity

});


}

catch(error){

toast.error("Failed to load course");

}


}




const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});


}




const handleSubmit=async(e)=>{

e.preventDefault();


try{


await axios.put(

`http://localhost:8000/course/admin/${course_id}`,

{

title:formData.title,

description:formData.description,

duration:Number(formData.duration),

capacity:Number(formData.capacity)

},

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


toast.success("Course Updated");


}


catch(error){

toast.error("Update failed");

}


}





return(
<div className="
min-h-screen
flex
justify-center
items-center
bg-gray-100
p-6
">

<div className="
bg-white
rounded-3xl
shadow-lg
p-8
max-w-3xl
">


<h1 className="
text-3xl
font-bold
text-indigo-700
mb-8
">

Update Course

</h1>



<form onSubmit={handleSubmit}>


<label className="font-semibold">
Course Title
</label>


<input

name="title"

value={formData.title}

onChange={handleChange}

className="
w-full
border border-gray-300
p-3
rounded-xl
mb-5
"

/>



<label className="font-semibold">
Description
</label>


<textarea

name="description"

value={formData.description}

onChange={handleChange}

rows="5"

className="
w-full
border border-gray-300
p-3
rounded-xl
mb-5
"

/>



<label className="font-semibold">
Duration Weeks
</label>


<input

type="number"

name="duration"

value={formData.duration}

onChange={handleChange}

className="
w-full
border border-gray-300
p-3
rounded-xl
mb-5
"

/>




<label className="font-semibold">
Capacity
</label>


<input

type="number"

name="capacity"

value={formData.capacity}

onChange={handleChange}

className="
w-full
border border-gray-300
p-3
rounded-xl
mb-8
"

/>



<button

className="
bg-indigo-600
text-white
px-8
py-3
rounded-xl
hover:bg-indigo-700
"

>

Save Changes

</button>



</form>


</div>

/</div>


)


}


export default UpdateCourse;