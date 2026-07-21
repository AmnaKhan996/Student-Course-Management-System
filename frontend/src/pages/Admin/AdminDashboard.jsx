import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AddCourse from "../../components/AddCourse";
import UpdateCourse from "../../components/UpdateCourse";
import CourseTable from "../../components/CourseTable";
import Pagination from "../../components/Pagination";

function AdminDashboard() {

    const [courses, setCourses] = useState([]);

    const [page, setPage] = useState(1);

    const limit = 5;

    const [totalPages, setTotalPages] = useState(1);

    const [showCreate, setShowCreate] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState(null);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();


    const handleLogout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully");

    navigate("/login");

};

    const fetchCourses = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8000/course?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCourses(response.data.courses);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load courses");

        }

    };

    useEffect(() => {

        fetchCourses();

    }, [page]);

    

    const deleteCourse = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8000/course/admin/delete/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            toast.success("Course Deleted");

            fetchCourses();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        }

    };

   return (

<div className="min-h-screen bg-slate-100 p-8">


    {/* Top Header */}

    <div className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-gray-200
        p-6
        mb-8
        flex
        justify-between
        items-center
    ">


        <div>

            <h1 className="
                text-3xl
                font-bold
                text-indigo-700
            ">
                Admin Dashboard
            </h1>


            <p className="
                text-gray-500
                mt-2
            ">
                Manage courses and monitor learning system
            </p>


        </div>



        <div className="flex gap-4">


            <button

                onClick={() => setShowCreate(true)}

                className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-md
                transition
                "

            >

                + Create Course

            </button>




            <button

                onClick={handleLogout}

                className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-md
                transition
                "

            >

                Logout

            </button>


        </div>


    </div>






    {/* Dashboard Stats */}


    <div className="
        grid
        md:grid-cols-3
        gap-6
        mb-8
    ">



        <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
   
        ">


            <p className="text-gray-500">

                Courses on Page

            </p>


            <h2 className="
                text-4xl
                font-bold
                text-indigo-700
                mt-2
            ">

                {courses.length}

            </h2>


        </div>





        <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm

        ">


            <p className="text-gray-500">

                Current Page

            </p>


            <h2 className="
                text-4xl
                font-bold
                text-green-600
                mt-2
            ">

                {page}

            </h2>


        </div>






        <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
      
        ">


            <p className="text-gray-500">

                Total Pages

            </p>


            <h2 className="
                text-4xl
                font-bold
                text-purple-600
                mt-2
            ">

                {totalPages}

            </h2>


        </div>


    </div>







    {/* Course Table Section */}


    <div className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-gray-200
        p-8
    ">


        <div className="mb-6">


            <h2 className="
                text-2xl
                font-bold
                text-gray-800
            ">

                Course Management

            </h2>



            <p className="
                text-gray-500
                mt-1
            ">

                Click on any course row to update details

            </p>


        </div>





        <CourseTable

            courses={courses}

            deleteCourse={deleteCourse}

            onRowClick={(course)=>{

                setSelectedCourse(course);

                setShowUpdate(true);

            }}

        />



    </div>








    {/* Pagination */}


    <div className="
        flex
        justify-center
        mt-8
    ">


        <Pagination

            page={page}

            totalPages={totalPages}

            setPage={setPage}

        />


    </div>







    {/* Create Course Modal */}


    {

    showCreate &&

    (

        <AddCourse

            close={()=>setShowCreate(false)}

            refresh={fetchCourses}

        />

    )

    }







    {/* Update Course Modal */}


    {

    showUpdate &&

    (

        <UpdateCourse

            course={selectedCourse}

            close={()=>setShowUpdate(false)}

            refresh={fetchCourses}

        />

    )

    }



</div>

);

}

export default AdminDashboard;