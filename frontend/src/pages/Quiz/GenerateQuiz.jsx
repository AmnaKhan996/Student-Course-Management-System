import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function GenerateQuiz({ topic_id, close }) {

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        difficulty: "",
        exam_type: "",
        total_questions: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                `http://localhost:8000/quiz/generate/${topic_id}`,

                {
                    difficulty: formData.difficulty,
                    exam_type: formData.exam_type,
                    total_questions: Number(formData.total_questions)
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            toast.success("Quiz Generated Successfully");

            close();


        } catch(error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail || "Quiz generation failed"
            );

        }

    };



    return (

        <div className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
            z-50
            p-6
        ">


            <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                w-full
                max-w-lg
            ">


                <h1 className="
                    text-3xl
                    font-bold
                    text-indigo-700
                    mb-8
                ">
                    Generate Quiz
                </h1>



                <form onSubmit={handleSubmit}>


                    {/* Difficulty */}

                    <label className="font-semibold">
                        Difficultyy
                    </label>


                    <select

                        name="difficulty"

                        value={formData.difficulty}

                        onChange={handleChange}

                        className="
                            w-full
                            border
                            border-gray-300
                            p-3
                            rounded-xl
                            mb-5
                        "

                        required

                    >

                        <option value="">
                            Select Difficulty
                        </option>

                        <option value="Easy">
                            Easy
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Hard">
                            Hard
                        </option>


                    </select>




                    {/* Exam Type */}

                    <label className="font-semibold">
                        Exam Type
                    </label>


                    <select

                        name="exam_type"

                        value={formData.exam_type}

                        onChange={handleChange}

                        className="
                            w-full
                            border
                            border-gray-300
                            p-3
                            rounded-xl
                            mb-5
                        "

                        required

                    >

                        <option value="">
                            Select Exam Type
                        </option>


                        <option value="MCQS">
                            MCQS
                        </option>


                        <option value="TRUE_FALSE">
                            True / False
                        </option>


                        <option value="SHORT_ANSWER">
                            Short Answer
                        </option>


                    </select>




                    {/* Total Questions */}

                    <label className="font-semibold">
                        Total Questions
                    </label>


                    <input

                        type="number"

                        name="total_questions"

                        value={formData.total_questions}

                        onChange={handleChange}

                        min="1"

                        className="
                            w-full
                            border
                            border-gray-300
                            p-3
                            rounded-xl
                            mb-8
                        "

                        required

                    />




                    <div className="
                        flex
                        justify-end
                        gap-4
                    ">


                        <button

                            type="button"

                            onClick={close}

                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-gray-300
                            "

                        >
                            Cancel

                        </button>



                        <button

                            type="submit"

                            className="
                                bg-indigo-600
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                hover:bg-indigo-700
                            "

                        >

                            Generate

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );

}


export default GenerateQuiz;