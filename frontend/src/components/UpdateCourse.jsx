import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UpdateCourse({ course, close, refresh }) {

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        capacity: ""
    });

    useEffect(() => {

        if (course) {

            setFormData({
                title: course.title,
                description: course.description,
                duration: course.duration,
                capacity: course.capacity
            });

        }

    }, [course]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(

                `http://localhost:8000/course/admin/${course.id}`,

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

            toast.success("Course Updated Successfully");

            refresh();

            close();

        }

        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail || "Update Failed"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-indigo-700 mb-6">

                    Update Course

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                        placeholder="Course Title"

                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <textarea

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Description"

                        className="w-full border p-3 rounded-lg mb-4"

                        rows="4"

                        required

                    />

                    <input

                        type="number"

                        name="duration"

                        value={formData.duration}

                        onChange={handleChange}

                        placeholder="Duration"

                        className="w-full border p-3 rounded-lg mb-4"

                        required

                    />

                    <input

                        type="number"

                        name="capacity"

                        value={formData.capacity}

                        onChange={handleChange}

                        placeholder="Capacity"

                        className="w-full border p-3 rounded-lg mb-6"

                        required

                    />

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={close}

                            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"

                        >

                            Update

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default UpdateCourse;