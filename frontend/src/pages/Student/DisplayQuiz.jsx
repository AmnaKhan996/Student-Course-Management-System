import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    ChevronDown,
    ChevronRight,
    Pencil,
    Eye,
    BookOpen,
    Search
} from "lucide-react";


function DisplayQuiz({courseId}) {


const token = localStorage.getItem("token");


const [topics,setTopics] = useState([]);

const [loading,setLoading] = useState(true);

const [expanded,setExpanded] = useState(null);

const [search,setSearch] = useState("");

const navigate = useNavigate();



useEffect(()=>{

if(courseId){
    fetchTopics();
}

},[courseId]);






const fetchTopics = async()=>{


try{


const headers={
Authorization:`Bearer ${token}`
};



// Fetch topics

const topicResponse = await axios.get(

`http://localhost:8000/topics/${courseId}`,

{
headers
}

);


const topicData = topicResponse.data;





// Fetch quizzes topic wise

const data = await Promise.all(

topicData.map(async(topic)=>{

let quizzes=[];

try{

const quizResponse = await axios.get(
    `http://localhost:8000/quiz/student/${topic.id}`,
    {
        headers
    }
);

quizzes = quizResponse.data || [];

console.log(`Fetched quizzes for topic ${topic.id}:`, quizzes);

}
catch(error){

if(error.response?.status !== 404){
    console.log(error);
}

}


return {

...topic,

quizzes

};


return {

...topic,

quizzes:quizResponse.data || []

};


})

);



setTopics(data);



}

catch(error){

console.log(error);

toast.error("Could not load topics and quizzes");

}

finally{

setLoading(false);

}


};







const toggleTopic=(id)=>{


setExpanded(prev=>

prev===id ? null : id

);


};







const filteredTopics = topics.filter(topic=>

topic.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);







if(loading){

return(

<div className="
h-64
flex
justify-center
items-center
text-gray-500
">

Loading exams...

</div>

)

}







return (

<div className="space-y-8">





{/* HEADER */}


<div className="
bg-gradient-to-r
from-indigo-600
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
">


<div className="
flex
items-center
gap-3
">


<BookOpen size={35}/>


<h1 className="
text-3xl
font-bold
">

Course Exams

</h1>


</div>


<p className="
mt-2
text-indigo-100
">

Manage quizzes created under course topics

</p>


</div>







{/* SEARCH */}


<div className="
bg-white
rounded-2xl
shadow
p-5
">


<div className="
relative
max-w-md
">


<Search

size={20}

className="
absolute
left-3
top-3
text-gray-400
"

/>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search topic..."

className="
w-full
pl-10
py-3
rounded-xl
outline-none
focus:ring-2
focus:ring-indigo-500
"

/>


</div>


</div>









{/* TABLE */}



<div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
">


<table className="
w-full
text-left
">



<thead className="
bg-gray-50
">


<tr>




<th className="
px-6
py-5
text-gray-600
font-semibold
">

Topic

</th>


<th className="
px-6
py-5
text-gray-600
font-semibold
text-center
">

Total Quizzes

</th>

</tr>


</thead>





<tbody>


{

filteredTopics.length===0

?

<tr>

<td
colSpan="3"
className="
text-center
py-10
text-gray-500
">

No topics found

</td>

</tr>



:


filteredTopics.map(topic=>{


const open = expanded===topic.id;



return(

<>


<tr

key={topic.id}

onClick={()=>toggleTopic(topic.id)}

className="
hover:bg-indigo-50
cursor-pointer
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
gap-3
font-semibold
text-gray-800
">


{

open

?

<ChevronDown size={20}/>

:

<ChevronRight size={20}/>

}


{topic.title}


</div>


</td>





<td className="
px-6
py-5
text-center
">


<span className="
bg-indigo-100
text-indigo-700
px-3
py-1
rounded-full
text-sm
font-semibold
">

{topic.quizzes.length}

</span>


</td>




</tr>









{/* QUIZZES TABLE */}


{

open &&


<tr>


<td
colSpan="3"
className="
bg-gray-50
px-10
py-6
"


>


<table className="
w-full
bg-white
rounded-xl
overflow-hidden
">


<thead className="
bg-gray-100
">


<tr>
<th className="
px-5
py-4
text-left
text-gray-600
">
Quiz ID
</th>



<th className="
px-5
py-4
text-left
text-gray-600
">

Quiz Type

</th>


<th className="
px-5
py-4
text-center
text-gray-600
">

Questions

</th>



<th className="
px-5
py-4
text-center
text-gray-600
">

Status

</th>

<th className="
px-5
py-4
text-center
text-gray-600
">
Score
</th>



<th className="
px-5
py-4
text-center
text-gray-600
">

Action

</th>



</tr>


</thead>






<tbody>


{

topic.quizzes.length===0

?


<tr>

<td
colSpan="4"
className="
text-center
py-8
text-gray-500
">

No quizzes available

</td>

</tr>



:


topic.quizzes.map(quiz=>(



<tr

key={quiz.id}

className="
hover:bg-gray-50
transition
"

>

<td className="
px-5
py-4
font-medium
text-gray-600
">

#{quiz.id}

</td>

<td className="
px-5
py-4
font-medium
text-gray-800
">

{quiz.exam_type}

</td>




<td className="
px-5
py-4
text-center
">

{quiz.total_questions}

</td>




<td className="px-5 py-4 text-center">

<span
className={`
px-3
py-1
rounded-full
text-sm
font-semibold

${
    quiz.attempt_status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        :
    quiz.attempt_status === "Pass"
        ? "bg-green-100 text-green-700"
        :
    quiz.attempt_status === "Fail"
        ? "bg-red-100 text-red-700"
        :
        "bg-gray-100 text-gray-700"
}

`}
>

{quiz.attempt_status}

</span>

</td>


<td className="
px-5
py-4
text-center
">

{

    `${quiz.score}%`
}

</td>





<td className="px-5 py-4 text-center">

    {quiz.action === "Attempt" ? (

        <button
            className="
            inline-flex
            items-center
            gap-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
            onClick={() => navigate(`/quiz/${quiz.id}/attempt`)}
        >
            <Pencil size={15} />
            Attempt
        </button>

    ) : (

        <button
            className="
            inline-flex
            items-center
            gap-2
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
            onClick={() => navigate(`/quiz/${quiz.id}/result`)}
        >
            <Eye size={15} />
            View
        </button>

    )}

</td>


</tr>


))


}


</tbody>


</table>


</td>


</tr>


}



</>


)


})


}



</tbody>



</table>


</div>





</div>


)

}


export default DisplayQuiz;