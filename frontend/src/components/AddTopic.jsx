import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddTopic({ courseId,close}) {

    const course_id = courseId

    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        learning_objectives: "",
        content :"",
        example:"",
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

                `http://localhost:8000/topics/create/${course_id}`,

                {
                    title: formData.title,
                    description: formData.description,
                    learning_objectives:formData.learning_objectives,
                    content: formData.content,
                    example : formData.example,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Topic Added Successfully");

            close();

        } catch (error) {
            if(error.response.status === 401) {
                toast.error("Unauthorized. Please log in again.");
                navigate("/login");
            }

            console.log(error);

            toast.error(
                error.response?.data?.detail || "Failed to add topic"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">

                <h2 className="text-3xl font-bold text-indigo-700 mb-6">

                    Add Topic

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg mb-4"

                        required

                    />

                    <textarea

                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg mb-4"

                        required

                    />


                    <textarea

                        name="learning_objectives"
                        placeholder="Learning Objectives"
                        value={formData.learning_objectives}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg mb-4"

                        required

                    />


                    <textarea

                        name="content"
                        placeholder="Detailed Topic Content.Explain the topic here..."
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg mb-4"

                        required

                    />

                    <textarea

                        name="example"
                        placeholder="Example:<h1>Hello World</h1> <p>This is paragraph</p>"
                        value={formData.example}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg mb-4"

                        required

                    />


                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={close}

                            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"

                        >

                            Save

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddTopic;