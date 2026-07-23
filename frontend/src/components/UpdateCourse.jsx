import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateCourse({ course, close, refresh }) {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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
            if(error.response.status === 401) {
                toast.error("Unauthorized. Please log in again.");
                navigate("/login");
            }

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

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Course Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter course description"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Duration (Weeks)
                        </label>

                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Enter duration"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Capacity
                        </label>

                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            placeholder="Enter capacity"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={close}
                            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Update Course
                        </button>
                    </div>

                </form>

            </div>

        </div>

    );

}

export default UpdateCourse;