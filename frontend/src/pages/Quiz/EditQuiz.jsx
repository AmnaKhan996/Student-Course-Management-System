import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
    ArrowLeft,
    Plus,
    BookOpen,
    FileQuestion,
    Clock,
    Trash2,
    Send
} from "lucide-react";


function EditQuiz() {


const {quizId}=useParams();

const navigate=useNavigate();

const token=localStorage.getItem("token");



const [quiz,setQuiz]=useState(null);

const [questions,setQuestions]=useState([]);

const [loading,setLoading]=useState(true);






useEffect(()=>{

fetchQuiz();

},[quizId]);







// ==========================
// FETCH QUIZ
// ==========================


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


setQuiz(response.data);

setQuestions(
response.data.questions || []
);


}

catch(error){

console.log(error);

toast.error("Failed to load quiz");

}

finally{

setLoading(false);

}


};









// ==========================
// UPDATE QUESTION
// ==========================


const updateQuestion=async(question)=>{
const question_id=question.id;

try{


await axios.put(

`http://localhost:8000/quiz/question/update/${question_id}`,

{

question_text:question.question_text,

options:question.options,

correct_answer:question.correct_answer

},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


toast.success("Question updated");


fetchQuiz();


}

catch(error){

console.log(error);

toast.error("Update failed");

}


};









// ==========================
// DELETE QUESTION
// ==========================


const deleteQuestion=async(id)=>{


try{


await axios.delete(

`http://localhost:8000/quiz/question/delete/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


toast.success("Question deleted");


fetchQuiz();


}

catch(error){

console.log(error);

toast.error("Delete failed");

}


};









// ==========================
// PUBLISH QUIZ
// ==========================


const publishQuiz=async()=>{
const quiz_id=quiz.id;

try{


await axios.put(

`http://localhost:8000/quiz/submit/${quiz_id}`,

{},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



toast.success("Quiz published");


fetchQuiz();



}

catch(error){

console.log(error);

toast.error("Publish failed");

}


};









const updateQuestionText=(id,value)=>{


setQuestions(prev=>

prev.map(q=>

q.id===id

?

{
...q,
question_text:value
}

:

q

)

);


};








const updateOption=(questionId,index,value)=>{


setQuestions(prev=>

prev.map(q=>{


if(q.id!==questionId)
return q;



const options=[...q.options];

options[index]=value;



return{

...q,

options

};


})

);


};









const updateCorrectAnswer=(id,value)=>{


setQuestions(prev=>

prev.map(q=>

q.id===id

?

{
...q,
correct_answer:value
}

:

q

)

);


};









if(loading){


return(

<div className="
h-64
flex
items-center
justify-center
text-gray-500
">

Loading quiz...

</div>

)

}







if(!quiz){

return null;

}








return (

<div className="max-w-7xl mx-auto space-y-8 pb-10">


{/* ================= HEADER ================= */}

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


<div className="
flex
justify-between
items-start
">


<div>


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-white/80
hover:text-white
mb-6
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
backdrop-blur
">

<BookOpen size={35}/>

</div>



<div>

<h1 className="
text-4xl
font-bold
tracking-tight
">

{quiz.title}

</h1>


<div className="
flex
gap-3
mt-4
flex-wrap
">


<span className="
bg-white/20
px-4
py-2
rounded-full
text-sm
">

{quiz.exam_type}

</span>



<span className="
bg-white/20
px-4
py-2
rounded-full
text-sm
">

{quiz.difficulty}

</span>




<span className="
bg-white/20
px-4
py-2
rounded-full
text-sm
">

{quiz.status}

</span>


</div>


</div>


</div>



</div>








<div className="
flex
gap-3
">


<button

onClick={()=>navigate(`/quiz/${quiz.id}/add-question`)}

className="
bg-white
text-indigo-700
px-6
py-3
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
transition
flex
items-center
gap-2
"

>

<Plus size={18}/>

Add Question

</button>





<button

onClick={publishQuiz}

disabled={quiz.status==="Published"}

className="
bg-emerald-500
hover:bg-emerald-600
px-6
py-3
rounded-2xl
font-semibold
shadow-lg
flex
items-center
gap-2
transition
"

>

<Send size={18}/>

{
quiz.status==="Published"
?
"Published"
:
"Publish Exam"
}


</button>


</div>




</div>


</div>









{/* ================= SUMMARY ================= */}


<div className="
grid
md:grid-cols-3
gap-6
">


<div className="
bg-white
rounded-3xl
shadow-lg
p-7
hover:shadow-xl
transition
">


<div className="
flex
items-center
gap-3
text-gray-500
">

<FileQuestion/>

Questions

</div>


<h2 className="
text-4xl
font-bold
mt-4
text-indigo-600
">

{questions.length}

</h2>


</div>






<div className="
bg-white
rounded-3xl
shadow-lg
p-7
hover:shadow-xl
transition
">


<div className="
flex
items-center
gap-3
text-gray-500
">

<Clock/>

Created

</div>


<h2 className="
text-xl
font-semibold
mt-4
">

{
new Date(
quiz.created_at
)
.toLocaleDateString()
}


</h2>


</div>







<div className="
bg-white
rounded-3xl
shadow-lg
p-7
hover:shadow-xl
transition
">


<p className="
text-gray-500
">

Exam ID

</p>


<h2 className="
text-4xl
font-bold
text-indigo-600
mt-3
">

#{quiz.id}

</h2>


</div>


</div>









{/* ================= QUESTIONS ================= */}



<div className="
space-y-8
">


{

questions.length===0

?


<div className="
bg-white
rounded-3xl
shadow-lg
p-12
text-center
text-gray-500
">

No questions added yet

</div>



:


questions.map((question,index)=>(


<div

key={question.id}

className="
bg-white
rounded-3xl
shadow-xl
p-8
hover:shadow-2xl
transition
"


>





<div className="
flex
justify-between
items-center
mb-8
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
bg-indigo-600
text-white
flex
items-center
justify-center
font-bold
text-lg
">

{index+1}

</div>



<h2 className="
text-xl
font-bold
text-gray-800
">

Question {index+1}

</h2>


</div>





<button

onClick={()=>deleteQuestion(question.id)}

className="
text-red-500
hover:bg-red-50
px-4
py-2
rounded-xl
flex
items-center
gap-2
"

>

<Trash2 size={17}/>

Delete

</button>


</div>









<textarea

value={question.question_text}

onChange={(e)=>
updateQuestionText(
question.id,
e.target.value
)
}

className="
w-full
bg-gray-50
rounded-2xl
p-5
text-lg
font-medium
focus:ring-2
focus:ring-indigo-500
outline-none
"

 />









<div className="
grid
md:grid-cols-2
gap-5
mt-7
">


{

question.options?.map((option,i)=>(


<div

key={i}

className={`
rounded-2xl
p-4
flex
items-center
gap-4
transition

${
question.correct_answer===option

?

"bg-green-50 shadow-md"

:

"bg-gray-50"

}

`}

>


<div className="
w-9
h-9
rounded-full
bg-white
flex
items-center
justify-center
font-bold
text-gray-600
">

{
String.fromCharCode(
65+i
)
}

</div>





<input

value={option}

onChange={(e)=>
updateOption(
question.id,
i,
e.target.value
)
}

className="
flex-1
bg-transparent
outline-none
font-medium
"

/>


</div>



))


}


</div>









<div className="
mt-7
bg-green-50
rounded-2xl
p-5
">


<p className="
text-sm
text-green-700
font-semibold
mb-2
">

Correct Answer

</p>


<div className="
flex
items-center
gap-3
text-green-800
font-bold
">


<span className="
bg-green-500
text-white
rounded-full
w-7
h-7
flex
items-center
justify-center
">

✓

</span>


<input

value={question.correct_answer}

onChange={(e)=>
updateCorrectAnswer(
question.id,
e.target.value
)
}

className="
bg-transparent
outline-none
flex-1
"

/>


</div>


</div>









<div className="
flex
justify-end
mt-8
">


<button

onClick={()=>updateQuestion(question)}

className="
bg-indigo-600
hover:bg-indigo-700
text-white
px-8
py-3
rounded-2xl
font-semibold
shadow-lg
transition
"

>

Save Question

</button>


</div>





</div>


))


}



</div>


</div>

)

}


export default EditQuiz;