import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
    ArrowLeft,
    PlusCircle,
    BookOpen
} from "lucide-react";


function AddQuestion(){

const {quizId}=useParams();

const navigate=useNavigate();

const token=localStorage.getItem("token");



const [quiz,setQuiz]=useState(null);

const [questionText,setQuestionText]=useState("");

const [options,setOptions]=useState([]);

const [correctAnswer,setCorrectAnswer]=useState("");

const [loading,setLoading]=useState(false);

const [fetching,setFetching]=useState(true);







// ==========================
// FETCH QUIZ TYPE
// ==========================


useEffect(()=>{

fetchQuiz();

},[quizId]);






const fetchQuiz=async()=>{


try{


const response=await axios.get(

`http://localhost:8000/quiz/view/${quizId}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


const quizData=response.data;


setQuiz(quizData);



// SET OPTIONS BASED ON TYPE


if(quizData.exam_type==="MCQS"){

setOptions([
"",
"",
"",
""
]);

}


else if(quizData.exam_type==="TRUE_FALSE"){

setOptions([
"True",
"False"
]);

}



else if(quizData.exam_type==="SHORT_ANSWER"){

setOptions([]);

}



}

catch(error){

console.log(error);

toast.error("Unable to load quiz");

}

finally{

setFetching(false);

}


};









const updateOption=(index,value)=>{


const updated=[...options];

updated[index]=value;

setOptions(updated);


};











// ==========================
// CREATE QUESTION
// ==========================


const addQuestion=async()=>{


try{


setLoading(true);



await axios.post(

`http://localhost:8000/quiz/question/create/${quizId}`,

{


question_text:questionText,


options:
quiz.exam_type==="SHORT_ANSWER"
?
[]
:
options,


correct_answer:correctAnswer


},


{
headers:{
Authorization:`Bearer ${token}`
}
}


);



toast.success("Question created successfully");


navigate(
`/quiz/${quizId}/edit`
);


}

catch(error){

console.log(error);

toast.error("Failed to create question");

}

finally{

setLoading(false);

}



};









if(fetching){


return(

<div className="
h-64
flex
items-center
justify-center
text-gray-500
">

Loading...

</div>

)


}










return(


<div className="
max-w-5xl
mx-auto
space-y-8
pb-10
">








{/* HEADER */}


<div className="
bg-gradient-to-br
from-indigo-700
via-blue-600
to-cyan-500
rounded-3xl
p-10
text-white
shadow-2xl
">



<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-white/80
hover:text-white
mb-7
"

>

<ArrowLeft size={18}/>

Back

</button>







<div className="
flex
items-center
gap-5
">


<div className="
bg-white/20
p-4
rounded-2xl
">

<BookOpen size={35}/>

</div>





<div>

<h1 className="
text-4xl
font-bold
">

Add Question

</h1>


<p className="
text-white/80
mt-2
">

{quiz.title}

</p>



<div className="
mt-3
inline-flex
bg-white/20
px-4
py-2
rounded-full
text-sm
">

{quiz.exam_type}

</div>



</div>


</div>



</div>









{/* FORM */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-8
space-y-8
">








{/* QUESTION */}


<div>


<label className="
font-semibold
text-gray-700
block
mb-3
">

Question

</label>




<textarea

value={questionText}

onChange={(e)=>
setQuestionText(e.target.value)
}

placeholder="Write question..."

className="
w-full
min-h-[140px]
bg-gray-50
rounded-2xl
p-5
outline-none
focus:ring-2
focus:ring-indigo-500
"

/>



</div>









{/* MCQS / TRUE FALSE OPTIONS */}



{

options.length>0 &&

<div>


<label className="
font-semibold
text-gray-700
block
mb-4
">

Options

</label>




<div className="
grid
md:grid-cols-2
gap-5
">


{

options.map((option,index)=>(


<div

key={index}

className="
flex
items-center
gap-4
bg-gray-50
rounded-2xl
p-4
"

>


<div className="
w-10
h-10
rounded-full
bg-indigo-100
text-indigo-700
flex
items-center
justify-center
font-bold
">

{
quiz.exam_type==="TRUE_FALSE"
?
index===0
?
"T"
:
"F"
:
String.fromCharCode(
65+index
)
}

</div>





<input

value={option}

disabled={
quiz.exam_type==="TRUE_FALSE"
}

onChange={(e)=>
updateOption(
index,
e.target.value
)
}

placeholder="Option"

className="
flex-1
bg-transparent
outline-none
"

/>



</div>


))


}



</div>


</div>


}









{/* SHORT ANSWER INFO */}



{

quiz.exam_type==="SHORT_ANSWER" &&


<div className="
bg-blue-50
text-blue-700
rounded-2xl
p-5
font-medium
">

This question type accepts a written answer. No options are required.

</div>


}









{/* CORRECT ANSWER */}



<div>


<label className="
font-semibold
text-gray-700
block
mb-3
">

Correct Answer

</label>





{

quiz.exam_type==="MCQS" ||

quiz.exam_type==="TRUE_FALSE"

?


<select

value={correctAnswer}

onChange={(e)=>
setCorrectAnswer(e.target.value)
}

className="
w-full
bg-green-50
border-none
rounded-2xl
p-4
text-green-700
font-semibold
outline-none
"

>


<option value="">

Select correct answer

</option>



{

options.map((option,index)=>(


<option

key={index}

value={option}

>

{

quiz.exam_type==="MCQS"

?
`Option ${index+1} - ${option}`

:

option

}

</option>


))


}



</select>



:


<input

value={correctAnswer}

onChange={(e)=>
setCorrectAnswer(e.target.value)
}

placeholder="Enter correct answer"

className="
w-full
bg-green-50
rounded-2xl
p-4
outline-none
text-green-700
font-semibold
"

/>



}





</div>









<button

disabled={loading}

onClick={addQuestion}

className="
w-full
bg-indigo-600
hover:bg-indigo-700
text-white
py-4
rounded-2xl
font-semibold
text-lg
shadow-lg
transition
disabled:opacity-50
"

>


{

loading
?
"Creating..."
:
"Create Question"

}


</button>








</div>



</div>


)

}


export default AddQuestion;