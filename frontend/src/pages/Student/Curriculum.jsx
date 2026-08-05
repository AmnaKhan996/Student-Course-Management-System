import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import DisplayQuiz from "./DisplayQuiz";

function Curriculum() {
    const { courseId } = useParams();

    const [topics, setTopics] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/topics/${courseId}`
            );

            setTopics(res.data);

            if (res.data.length > 0) {
                setSelected(res.data[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-xl text-gray-500">
                    Loading topics...
                </h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-6">

            {/* Sidebar */}

            <div
                className="
                col-span-3
                bg-white
                rounded-3xl
                shadow-lg
                border-gray-200
                h-[85vh]
                overflow-y-auto
                "
            >

                <div className="p-6">

                <h1 className="text-2xl font-bold text-indigo-700 mb-2">

                Student Panel

                </h1>

                </div>

                <div className="p-4">

                    {
                        topics.length > 0 && (

                            topics.map((topic, index) => (

                                <button
                                    key={topic.id}
                                    onClick={() => setSelected(topic)}
                                    className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    p-4
                                    rounded-2xl
                                    mb-3
                                    transition

                                    ${
                                        selected?.id === topic.id
                                        ?
                                        "bg-indigo-600 text-white shadow-lg"
                                        :
                                        "hover:bg-indigo-50 text-gray-700"
                                    }
                                    `}
                                >

                                    <div
                                        className={`
                                        w-9
                                        h-9
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        font-bold

                                        ${
                                            selected?.id === topic.id
                                            ?
                                            "bg-white text-indigo-600"
                                            :
                                            "bg-indigo-100 text-indigo-600"
                                        }
                                        `}
                                    >
                                        {index + 1}
                                    </div>

                                    <span className="font-medium">
                                        {topic.title}
                                    </span>

                                </button>

                            ))

                        )
                    }

                    <button
                        onClick={() => setSelected("exam")}
                        className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        p-4
                        rounded-2xl
                        transition

                        ${
                            selected === "exam"
                            ?
                            "bg-green-600 text-white shadow-lg"
                            :
                            "bg-gray-100 hover:bg-green-100"
                        }
                        `}
                    >

                        <FileText size={20}/>

                        <span className="font-semibold">
                            Quizzes
                        </span>

                    </button>


                </div>

            </div>


            {/* Right Side */}

            <div
                className="
                col-span-9
                bg-white
                rounded-3xl
                shadow-lg
                border-gray-200
                h-[85vh]
                overflow-y-auto
                p-8
                "
            >

                {
                    selected === "exam" ?

                        (
                             <DisplayQuiz courseId={courseId}/>

                        )

                        :

                        selected ?

                        (

                        <div className="space-y-8">


                        {/* TITLE */}

                        <div>

                        <h1 className="
                        text-4xl
                        font-bold
                        text-gray-800
                        ">

                        {selected.title}

                        </h1>


                        <div className="
                        mt-3
                        inline-flex
                        bg-indigo-100
                        text-indigo-700
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        ">

                        Lesson Content

                        </div>


                        </div>







                        {/* DESCRIPTION */}

                        <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        text-gray-800
                        mb-3
                        ">

                        Overview

                        </h2>


                        <p className="
                        text-gray-600
                        text-lg
                        leading-8
                        whitespace-pre-line
                        ">

                        {selected.description}

                        </p>


                        </div>









                        {/* LEARNING OBJECTIVES */}



                        {

                        selected.learning_objectives &&


                        <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        text-gray-800
                        mb-3
                        ">

                        Learning Objectives

                        </h2>




                        <div className="
                        bg-green-50
                        border
                        border-green-200
                        rounded-2xl
                        p-6
                        text-gray-700
                        leading-7
                        whitespace-pre-line
                        ">

                        {selected.learning_objectives}

                        </div>


                        </div>


                        }









                        {/* TOPIC CONTENT */}


                        {

                        selected.content &&


                        <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        text-gray-800
                        mb-3
                        ">

                        Topic Content

                        </h2>



                        <div className="
                        bg-gray-50
                        rounded-2xl
                        p-6
                        text-gray-700
                        leading-8
                        whitespace-pre-line
                        ">

                        {selected.content}

                        </div>



                        </div>


                        }









                        {/* EXAMPLE */}



                        {

                        selected.example &&


                        <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        text-gray-800
                        mb-3
                        ">

                        Example

                        </h2>




                        <div className="
                        bg-gray-900
                        text-green-300
                        rounded-2xl
                        p-6
                        font-mono
                        leading-7
                        whitespace-pre-line
                        overflow-x-auto
                        shadow-inner
                        ">

                        {selected.example}

                        </div>



                        </div>


                        }





                        </div>

                        )



                            :

                            (

                                <div className="flex flex-col items-center justify-center h-full">

                                    <BookOpen
                                        size={90}
                                        className="text-gray-300"
                                    />

                                    <h2 className="text-3xl font-bold mt-6">
                                        No Topics Available
                                    </h2>

                                    <p className="text-gray-500 mt-3">
                                        The instructor hasn't uploaded any learning material yet.
                                    </p>

                                </div>

                            )
                }

            </div>

        </div>
    );
}

export default Curriculum;