import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function AttemptQuiz() {

    const { quizId } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    // question_id -> selected answer
    const [answers, setAnswers] = useState({});

    const [submitting, setSubmitting] = useState(false);


    const answeredCount = Object.keys(answers).length;

    const progress =
    quiz?.questions?.length > 0
        ? Math.round((answeredCount / quiz.questions.length) * 100)
        : 0;

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8000/quiz/view/${quizId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuiz(res.data);
            console.log("attempt quiz",res.data)

        }
        catch (err) {
            console.log(err);
            toast.error("Could not load quiz");
        }
        finally {
            setLoading(false);
        }

    };


    const handleAnswer = (questionId, value) => {

        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));

    };


    const submitQuiz = async () => {

        if (Object.keys(answers).length !== quiz.questions.length) {
            toast.error("Please answer all questions");
            return;
        }

        const payload = {
            answers: Object.entries(answers).map(([questionId, value]) => ({
                question_id: Number(questionId),
                selected_answer: value
            }))

        };

        try {
            const quiz_id = quiz.id
            const res = await axios.post(
                `http://localhost:8000/quiz/attempt/${quiz_id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Quiz submitted successfully");
            setTimeout(() => {
            navigate(-1);
            }, 1000);

        }
        catch (err) {
            console.log(err);
            toast.error("Could not submit quiz");
        }

    };


    if (loading)
        return (
            <div className="text-center mt-20">
                Loading Quiz...
            </div>
        );

return (

<div className="min-h-screen bg-gray-100 py-10">

    <div className="max-w-5xl mx-auto px-4">


        {/* QUIZ HEADER */}

        <div className="
            bg-gradient-to-r
            from-indigo-600
            to-blue-600
            rounded-3xl
            shadow-xl
            p-8
            text-white
            mb-8
        ">

            <h1 className="
                text-3xl
                font-bold
                mb-3
            ">
                {quiz.title}
            </h1>


            <div className="
                flex
                flex-wrap
                gap-4
                text-indigo-100
            ">

                <span>
                    📘 {quiz.exam_type}
                </span>


                <span>
                    ❓ {quiz.questions.length} Questions
                </span>


                <span>
                    🎯 Difficulty: {quiz.difficulty}
                </span>


            </div>



            {/* Progress */}

            <div className="mt-6">


                <div className="
                    flex
                    justify-between
                    text-sm
                    mb-2
                ">

                    <span>
                        Progress
                    </span>


                    <span>
                        {answeredCount}/{quiz.questions.length}
                    </span>


                </div>



                <div className="
                    w-full
                    bg-white/30
                    rounded-full
                    h-3
                ">

                    <div

                        style={{
                            width:`${progress}%`
                        }}

                        className="
                        bg-white
                        h-3
                        rounded-full
                        transition-all
                        "

                    />

                </div>


            </div>


        </div>





        {/* QUESTIONS */}


        {
            quiz.questions.map((question,index)=>(


            <div

            key={question.id}

            className="
            bg-white
            rounded-2xl
            shadow-md
            p-7
            mb-6
            border
            border-gray-200
            "

            >


                <div className="
                    flex
                    gap-3
                    mb-6
                ">


                    <div className="
                        bg-indigo-600
                        text-white
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        font-bold
                    ">
                        {index+1}
                    </div>


                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                    ">

                        {question.question_text}

                    </h2>


                </div>





                {/* MCQS */}

                {
                quiz.exam_type==="MCQS" &&

                <div className="space-y-3">


                {
                question.options?.map((option,i)=>(


                <label

                key={i}

                className={`
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-xl
                    border-2
                    cursor-pointer
                    transition

                    ${
                    answers[question.id]===option

                    ?
                    "border-indigo-600 bg-indigo-50"

                    :

                    "border-gray-200 hover:border-indigo-300"

                    }

                `}


                >

                    <input

                    type="radio"

                    name={`question-${question.id}`}

                    value={option}

                    checked={
                    answers[question.id]===option
                    }

                    onChange={(e)=>
                    handleAnswer(
                        question.id,
                        e.target.value
                    )
                    }

                    className="
                    accent-indigo-600
                    "

                    />



                    <span className="
                    text-gray-700
                    font-medium
                    ">
                        {option}
                    </span>


                </label>


                ))

                }


                </div>

                }





                {/* TRUE FALSE */}

                {
                quiz.exam_type==="TRUE_FALSE" &&

                <div className="space-y-3">


                {
                ["True","False"].map(option=>(


                <label

                key={option}

                className={`
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                border-2
                cursor-pointer

                ${
                answers[question.id]===option

                ?
                "border-indigo-600 bg-indigo-50"

                :

                "border-gray-200"

                }

                `}

                >

                    <input

                    type="radio"

                    name={`question-${question.id}`}

                    value={option}

                    checked={
                    answers[question.id]===option
                    }

                    onChange={(e)=>
                    handleAnswer(
                    question.id,
                    e.target.value
                    )
                    }

                    />

                    {option}


                </label>


                ))

                }


                </div>

                }





                {/* SHORT ANSWER */}

                {
                quiz.exam_type==="SHORT_ANSWER" &&


                <textarea

                rows="5"

                value={
                answers[question.id] || ""
                }

                onChange={(e)=>
                handleAnswer(
                    question.id,
                    e.target.value
                )
                }


                placeholder="
                Write your answer here...
                "


                className="
                w-full
                border
                rounded-xl
                p-4
                focus:ring-2
                focus:ring-indigo-500
                outline-none
                "

                />


                }



            </div>


            ))

        }





        {/* SUBMIT */}


        <div className="
        sticky
        bottom-5
        bg-white
        shadow-xl
        rounded-2xl
        p-5
        flex
        justify-between
        items-center
        border
        ">


            <div>

                <p className="
                font-semibold
                text-gray-800
                ">

                {answeredCount} / {quiz.questions.length} Answered

                </p>


                <p className="
                text-sm
                text-gray-500
                ">
                    Review your answers before submitting
                </p>


            </div>



            <button

            onClick={submitQuiz}

            disabled={submitting}

            className="
            bg-indigo-600
            hover:bg-indigo-700
            disabled:bg-gray-400
            text-white
            px-10
            py-3
            rounded-xl
            font-semibold
            shadow-lg
            transition
            "

            >

            {
            submitting
            ?
            "Submitting..."
            :
            "Submit Quiz"
            }


            </button>


        </div>



    </div>


</div>


);

}

export default AttemptQuiz;