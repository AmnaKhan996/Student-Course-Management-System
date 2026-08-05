import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Search,
    Users,
    Mail,
    CheckCircle
} from "lucide-react";


function EnrolledStudents({courseId}) {


const token = localStorage.getItem("token");

const [students,setStudents] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");



useEffect(()=>{

fetchStudents();

},[courseId]);



const fetchStudents = async()=>{

try{

const response = await axios.get(
`http://localhost:8000/course/${courseId}/students`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


setStudents(response.data);


}

catch(error){

console.log(error);
toast.error("Failed to load students");

}

finally{

setLoading(false);

}

};





const filteredStudents = students.filter(student=>

student.name
.toLowerCase()
.includes(search.toLowerCase())

||
student.username
.toLowerCase()
.includes(search.toLowerCase())

);





if(loading){

return(

<div className="
flex
justify-center
items-center
h-64
">

<p className="text-gray-500 text-lg">
Loading students...
</p>

</div>

)

}




return (

<div className="
space-y-8
">


{/* Header */}

<div className="
bg-gradient-to-r
from-indigo-600
via-blue-600
to-cyan-600
rounded-3xl
p-8
shadow-xl
text-white
">


<div className="
flex
justify-between
items-center
">


<div>

<div className="
flex
items-center
gap-3
">

<Users size={35}/>

<h1 className="
text-3xl
font-bold
">

Enrolled Students

</h1>

</div>


<p className="
mt-2
text-indigo-100
">

Students currently enrolled in this course

</p>


</div>



<div className="
bg-white/20
rounded-2xl
px-8
py-4
text-center
backdrop-blur
">


<p className="
text-sm
">

Total Students

</p>


<h2 className="
text-4xl
font-bold
">

{students.length}

</h2>


</div>


</div>


</div>






{/* Search */}

<div className="
bg-white
rounded-2xl
shadow
p-5
border-gray-300
">


<div className="
relative
max-w-md
">


<Search
className="
absolute
left-3
top-3
text-gray-400
"
size={20}
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search student..."

className="
w-full
pl-10
pr-4
py-3
rounded-xl
border-gray-300
focus:ring-2
focus:ring-indigo-500
outline-none
"

/>


</div>


</div>






{/* Table */}


<div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
border-gray-300
">


<table className="
w-full
text-left
">


<thead className="
bg-gray-50
border-gray-300
">


<tr>


<th className="
px-6
py-5
text-gray-600
font-semibold
">

Student

</th>


<th className="
px-6
py-5
text-gray-600
font-semibold
">

Email

</th>


<th className="
px-6
py-5
text-gray-600
font-semibold
">

Role

</th>


<th className="
px-6
py-5
text-gray-600
font-semibold
">

Status

</th>


</tr>


</thead>




<tbody>


{

filteredStudents.length===0

?


<tr>

<td
colSpan="4"
className="
text-center
py-10
text-gray-500
"
>

No students found

</td>

</tr>


:


filteredStudents.map((student)=>(


<tr

key={student.id}

className="
border-gray-300
hover:bg-indigo-50
transition
"


>


<td className="
px-6
py-5
">


<div className="
flex
items-center
gap-4
">


<div className="
w-12
h-12
rounded-full
bg-gradient-to-br
from-indigo-500
to-blue-600
flex
items-center
justify-center
text-white
font-bold
text-lg
">


{
student.name
.charAt(0)
.toUpperCase()
}


</div>



<div>


<p className="
font-semibold
text-gray-800
">

{student.name}

</p>


<p className="
text-sm
text-gray-400
">

ID #{student.id}

</p>


</div>


</div>


</td>






<td className="
px-6
py-5
">


<div className="
flex
items-center
gap-2
text-gray-600
">


<Mail size={18}/>

{student.username}


</div>


</td>






<td className="
px-6
py-5
">


<span className="
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
text-sm
font-semibold
">

Student

</span>


</td>






<td className="
px-6
py-5
">


<span className="
flex
items-center
gap-2
w-fit
px-3
py-1
rounded-full
bg-green-100
text-green-700
text-sm
font-semibold
">


<CheckCircle size={16}/>

Active


</span>


</td>




</tr>


))


}


</tbody>


</table>


</div>



</div>

)


}


export default EnrolledStudents;