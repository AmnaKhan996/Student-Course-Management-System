import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function QuizResult() {

    const { quizId } = useParams();

    const token = localStorage.getItem("token");

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchQuiz();
    }, []);



    const fetchQuiz = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8000/quiz/view/${quizId}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setQuiz(res.data);

            console.log("Quiz Result",res.data);


        }
        catch(err){

            console.log(err);
            toast.error("Could not load result");

        }
        finally{
            setLoading(false);
        }

    };



    if(loading)
    {
        return (
            <div className="text-center mt-20">
                Loading Result...
            </div>
        )
    }



    const attempt = quiz.attempts?.[0];

    const answers = attempt?.answers || [];



    return (

    <div className="
        min-h-screen
        bg-gray-100
        py-10
    ">


        <div className="
            max-w-5xl
            mx-auto
            px-5
        ">


            {/* RESULT HEADER */}

            <div className="
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                text-white
                rounded-3xl
                p-8
                shadow-xl
                mb-8
            ">


                <h1 className="
                    text-3xl
                    font-bold
                ">
                    {quiz.title}
                </h1>


                <div className="
                    flex
                    gap-5
                    mt-5
                    flex-wrap
                ">


                    <span>
                        Score: {attempt.score}%
                    </span>


                    <span className={`
                        px-4
                        py-1
                        rounded-full
                        font-semibold

                        ${
                        attempt.status==="Pass"
                        ?
                        "bg-green-500"
                        :
                        "bg-red-500"
                        }

                    `}>
                        {attempt.status}
                    </span>


                </div>


            </div>






            {/* ANSWERS */}


            {
            quiz.questions.map((question,index)=>{


                const answer = answers.find(
                    a=>a.question_id===question.id
                );


                return (

                <div

                key={question.id}

                className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-6
                    mb-5
                "

                >


                    <h2 className="
                        font-bold
                        text-lg
                        mb-5
                    ">

                    Q{index+1}. {question.question_text}

                    </h2>



                    <div className="
                        space-y-3
                    ">


                        <div className="
                            bg-gray-100
                            p-4
                            rounded-xl
                        ">

                            <p className="text-gray-500 text-sm">
                                Your Answer
                            </p>

                            <p className="
                                font-semibold
                            ">
                                {answer?.selected_answer || "Not Attempted"}
                            </p>


                        </div>




                        <div className="
                            bg-green-50
                            border
                            border-green-200
                            p-4
                            rounded-xl
                        ">


                            <p className="
                                text-gray-500
                                text-sm
                            ">
                                Correct Answer
                            </p>


                            <p className="
                                font-semibold
                                text-green-700
                            ">
                                {answer?.correct_answer}
                            </p>


                        </div>





                        <div>

                        {
                        answer?.is_correct

                        ?

                        <span className="
                            bg-green-100
                            text-green-700
                            px-4
                            py-1
                            rounded-full
                            font-semibold
                        ">
                            ✓ Correct
                        </span>


                        :

                        <span className="
                            bg-red-100
                            text-red-700
                            px-4
                            py-1
                            rounded-full
                            font-semibold
                        ">
                            ✕ Incorrect
                        </span>

                        }


                        </div>



                    </div>



                </div>


                )


            })

            }




        </div>


    </div>

    )

}


export default QuizResult;