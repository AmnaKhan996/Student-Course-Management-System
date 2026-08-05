import {useEffect, useState} from "react";
import axios from "axios";
import GenerateQuiz from "../pages/Quiz/GenerateQuiz";


function Topics({courseId}){


const token = localStorage.getItem("token");


const [topics,setTopics]=useState([]);

const [loading,setLoading]=useState(true);

const [isVisible, setVisible]=useState(false)

const [selectedTopic,setSelectedTopic] = useState();



useEffect(()=>{

    fetchTopics();

},[]);



const fetchTopics=async()=>{

try{

const response = await axios.get(

`http://localhost:8000/topics/${courseId}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setTopics(response.data);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

}





if(loading){

return(

<div className="
text-center
p-10
text-gray-500
">

Loading topics...

</div>

)

}




return(

<div className="max-w-5xl">


<h1 className="
text-4xl
font-bold
text-gray-800
mb-8
">

Course Curriculum

</h1>




{

topics.length===0 ?

(

<div className="
bg-white
rounded-xl
shadow
p-8
text-center
text-gray-500
">

No topics added yet

</div>

)

:

(

<div className="space-y-6">


{

topics.map((topic,index)=>(


<div

key={topic.id}

className="
bg-white
rounded-3xl
shadow-md
border
border-gray-200
overflow-hidden
hover:shadow-xl
transition
"


>


{/* Header */}

<div className="
bg-indigo-50
p-6
">


<div className="
flex
justify-between
items-center
">


<h2 className="
text-2xl
font-bold
text-indigo-700
">

{index+1}. {topic.title}

</h2>


<div className="
    flex
    flex-col
    items-end
    gap-3
">

    <button

        onClick={()=>{
            setVisible(true)
            setSelectedTopic(topic.id)
        }}

        className="
            px-5
            py-2
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-xl
            font-semibold
            transition
            shadow-sm
        "

    >
        Generate Quiz
    </button>


    <span className="
        bg-indigo-100
        text-indigo-700
        px-4
        py-1
        rounded-full
        text-sm
        font-semibold
    ">
        Lesson {index+1}
    </span>


</div>



</div>


</div>





{/* Body */}

<div className="
p-8
space-y-6
">


{/* Description */}

<div>

<h3 className="
text-xl
font-bold
text-gray-800
mb-2
">

Overview

</h3>


<p className="
text-gray-600
leading-7
text-lg
whitespace-pre-line
">

{topic.description}

</p>


</div>





{/* Learning Objectives */}

{

topic.learning_objectives &&

<div>

<h3 className="
text-xl
font-bold
text-gray-800
mb-3
">

Learning Objectives

</h3>


<div className="
bg-green-50
border
border-green-200
rounded-xl
p-5
text-gray-700
whitespace-pre-line
">

{topic.learning_objectives}

</div>


</div>

}






{/* Content */}

{

topic.content &&

<div>

<h3 className="
text-xl
font-bold
text-gray-800
mb-3
">

Topic Content

</h3>


<p className="
text-gray-700
leading-8
whitespace-pre-line
">

{topic.content}

</p>


</div>

}







{/* Examples */}

{

topic.example &&

<div>

<h3 className="
text-xl
font-bold
text-gray-800
mb-3
">

Examples

</h3>


<div className="
bg-gray-900
text-green-300
rounded-xl
p-5
font-mono
whitespace-pre-line
overflow-x-auto
">

{topic.example}

</div>


</div>

}




</div>


</div>


))

}



</div>


)

}



    {/* Create Quiz Modal */}


    {

    isVisible &&

    (

        <GenerateQuiz
            topic_id={selectedTopic}
            close={()=>setVisible(false)}


        />

    )

    }


</div>






)

}




export default Topics;