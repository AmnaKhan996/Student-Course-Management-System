import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import {
    BookOpen,
    CheckCircle,
    FileQuestion
} from "lucide-react";


function ViewQuiz(){


const {quizId}=useParams();


const token=localStorage.getItem("token");


const [quiz,setQuiz]=useState(null);

const [loading,setLoading]=useState(true);





useEffect(()=>{

fetchQuiz();

},[]);







// =======================
// FETCH QUIZ
// =======================


const fetchQuiz=async()=>{
const quiz_id=quizId;

try{


const response=await axios.get(

`http://localhost:8000/quiz/view/${quiz_id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setQuiz(response.data);



}

catch(error){

console.log(error);

toast.error("Failed to load quiz");

}

finally{

setLoading(false);

}


};









if(loading){


return(

<div className="
h-64
flex
justify-center
items-center
text-gray-500
">

Loading quiz...

</div>

)

}






if(!quiz){

return(

<div className="
text-center
p-10
text-gray-500
">

Quiz not found

</div>

)

}








return(


<div className="
space-y-8
">





{/* HEADER */}


<div className="
bg-gradient-to-r
from-indigo-600
via-blue-600
to-cyan-600
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

{quiz.title}

</h1>


</div>



<p className="
mt-3
text-indigo-100
">

View published quiz

</p>



</div>









{/* QUIZ DETAILS */}


<div className="
bg-white
rounded-2xl
shadow
p-6
">



<div className="
grid
md:grid-cols-4
gap-6
">



<div>

<p className="
text-gray-500
text-sm
">

Exam Type

</p>


<p className="
font-semibold
">

{quiz.exam_type}

</p>


</div>







<div>

<p className="
text-gray-500
text-sm
">

Difficulty

</p>


<p className="
font-semibold
">

{quiz.difficulty}

</p>


</div>






<div>

<p className="
text-gray-500
text-sm
">

Total Questions

</p>


<p className="
font-semibold
">

{quiz.total_questions}

</p>


</div>






<div>

<p className="
text-gray-500
text-sm
">

Status

</p>


<span className="
inline-block
mt-1
px-3
py-1
rounded-full
bg-green-100
text-green-700
font-semibold
text-sm
">

{quiz.status}

</span>


</div>






</div>


</div>









{/* QUESTIONS */}



<div className="
space-y-6
">



<h2 className="
text-2xl
font-bold
text-gray-800
flex
items-center
gap-2
">


<FileQuestion/>

Questions


</h2>






{

quiz.questions.length===0


?


<div className="
bg-white
rounded-xl
p-8
text-center
text-gray-500
">

No questions available

</div>



:


quiz.questions.map((question,index)=>(



<div

key={question.id}

className="
bg-white
rounded-2xl
shadow
p-6
"

>


<h3 className="
font-semibold
text-lg
text-gray-800
mb-5
">


{index+1}. {question.question_text}


</h3>







<div className="
space-y-3
">


{


question.options?.map((option)=>(


<div

key={option}

className={`
flex
items-center
justify-between
p-4
rounded-xl
border
font-medium


${
option === question.correct_answer

?

"bg-green-100 border-green-500 text-green-700"

:

"bg-gray-50 border-gray-200 text-gray-700"

}

`}

>



<span>

{option}

</span>






{

option===question.correct_answer &&


<CheckCircle
className="
text-green-600
"
size={22}
/>


}




</div>


))


}



</div>







{/* CORRECT ANSWER */}


<div className="
mt-5
bg-green-50
border
border-green-200
rounded-xl
p-4
">


<p className="
text-sm
text-green-700
font-semibold
">

Correct Answer

</p>


<p className="
text-green-800
font-bold
mt-1
">

{question.correct_answer}

</p>


</div>






</div>


))


}





</div>







</div>


)

}



export default ViewQuiz;