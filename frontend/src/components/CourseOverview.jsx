import {useEffect, useState} from "react";
import axios from "axios";


function CourseOverview({courseId}){


const token = localStorage.getItem("token");


const [course,setCourse]=useState(null);



useEffect(()=>{

fetchCourse();

},[]);



const fetchCourse=async()=>{


try{


const response = await axios.get(

`http://localhost:8000/course/admin/${courseId}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setCourse(response.data);


}

catch(error){

console.log(error);

}


}



if(!course){

return (

<div className="text-center p-10">

Loading...

</div>

)

}



return(

<div>


<h1 className="
text-4xl
font-bold
text-gray-800
">

{course.title}

</h1>



<div className="
grid
grid-cols-3
gap-6
mt-8
">


<Card

title="Enrolled Students"

value={course.enrolled_students}

/>



<Card

title="Total Topics"

value={course.total_topics}

/>



<Card

title="Status"


value={course.isDeleted ? "Deleted" : "Active"}


/>



</div>





<div className="
bg-white
rounded-2xl
p-6
mt-8
shadow
">


<h2 className="
text-xl
font-bold
">

About Course

</h2>



<p className="
text-gray-600
mt-3
">

{course.description}

</p>



</div>



</div>

)

}





function Card({title,value}){


return(

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<p className="
text-gray-500
">

{title}

</p>


<h1 className="
text-4xl
font-bold
text-indigo-600
mt-2
">

{value}

</h1>


</div>

)

}



export default CourseOverview;