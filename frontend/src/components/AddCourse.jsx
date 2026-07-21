import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddCourse({ close, refresh }) {

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        capacity: ""
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

                "http://localhost:8000/course/admin/create",

                {
                    title: formData.title,
                    description: formData.description,
                    duration: Number(formData.duration),
                    capacity: Number(formData.capacity)
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Course Created Successfully");

            refresh();

            close();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail || "Failed to create course"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">

                <h2 className="text-3xl font-bold text-indigo-700 mb-6">

                    Create Course

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <textarea

                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <input

                        type="number"
                        name="duration"
                        placeholder="Duration (Weeks)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <input

                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-6"

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

export default AddCourse;