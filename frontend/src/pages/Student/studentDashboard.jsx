import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification";
import Curriculum from "../Student/Curriculum";
import LogoutButton from "../../components/LogoutButton";
function StudentDashboard() {


    const [courses, setCourses] = useState([]);

    const [myCourses, setMyCourses] = useState([]);
    
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    
    const [activeTab, setActiveTab] = useState("topics");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");



    const config = {

        headers: {

            Authorization: `Bearer ${token}`

        }

    };


    const handleLogout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully");

    navigate("/login");

};



    const fetchCourses = async()=>{


        try{


            // all courses

            const coursesResponse = await axios.get(

                "http://localhost:8000/course/",

                config

            );



            // student enrolled courses

            const myCoursesResponse = await axios.get(

                "http://localhost:8000/course/my_courses",

                config

            );

            console.log("MY COURSES",myCoursesResponse)


            setCourses(
                coursesResponse.data.courses
            );

            setMyCourses(
                myCoursesResponse.data
            );


        }
        catch(error){


            console.log(error);

            toast.error(
                "Failed to load courses"
            );


        }


    };





    useEffect(()=>{


        fetchCourses();


    },[]);






    const enrollCourse = async(courseId)=>{


        try{


            await axios.post(

                `http://localhost:8000/course/${courseId}/enroll`,

                {},

                config

            );



            toast.success(
                "Course enrolled"
            );



            fetchCourses();



        }
        catch(error){


            toast.error(

                error.response?.data?.detail ||
                "Enrollment failed"

            );


        }


    };






    const unenrollCourse = async(courseId)=>{


        try{


            await axios.delete(

                `http://localhost:8000/course/${courseId}/unenroll`,

                config

            );



            toast.success(
                "Course unenrolled"
            );



            fetchCourses();



        }
        catch(error){


            toast.error(

                error.response?.data?.detail ||
                "Unenroll failed"

            );


        }


    };







return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 p-8">


    {/* Navbar */}

    <div className="
        bg-white/10
        border-white/20
        rounded-2xl
        shadow-sm
        px-8
        py-5
        mb-10
        flex
        justify-between
        items-center
        border
        border-gray-200
    ">


        <div>

            <h1 className="
                text-3xl
                font-bold
                text-white
            ">
                Student Dashboard
            </h1>


            <p className="
                text-blue-200
                mt-1
            ">
                Browse courses and manage your enrollment
            </p>


        </div>

            <div className="flex gap-5 items-center">


            <Notification userId={localStorage.getItem("user_id")}/>


           

        {/* <button

            onClick={handleLogout}

            className="
            bg-red-600
            hover:bg-red-700
            shadow-lg
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

        </button> */}

         <LogoutButton/>


            </div>


    </div>





    {/* Course Section */}


    <div className="mb-6">

        <h2 className="
            text-2xl
            font-bold
            text-white
        ">

            Available Courses

        </h2>


        <p className="text-white mt-1">

            Choose a course and start learning

        </p>


    </div>





    {
        courses.length === 0

        ?

        (

            <div className="
                bg-white
                rounded-2xl
                p-10
                text-center
                shadow
            ">

                <h3 className="
                    text-xl
                    font-semibold
                    text-gray-700
                ">
                    No courses available
                </h3>


                <p className="text-gray-500 mt-2">

                    Please check later

                </p>


            </div>

        )


        :

        (

        <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
        ">


        {

        courses.map((course)=>(


        <div

        key={course.id}

        onDoubleClick={()=>{
            const isEnrolled= myCourses.some((item)=>{
                return item.course.id == course.id
            })

            if(isEnrolled){
                setSelectedCourseId(course.id)
                navigate(`/curriculum/${course.id}`)
            }
            else{
                toast.error("Please enroll first");
            }



            
            
        }}

        className="
        bg-white/10
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        hover:shadow-blue-900/40
        hover:-translate-y-2
        transition-all
        duration-300
        p-6
        border
        border-gray-100
        relative z-0
        "


        >



            {/* Card Header */}

            <div className="
                flex
                justify-between
                items-start
            ">


                <h3 className="
                    text-xl
                    font-bold
                    text-white
                ">

                    {course.title}

                </h3>



                {

                myCourses.some(
                    item=>item.course.id===course.id
                )

                &&

                <span className="
                    bg-green-500/20
                    text-green-300
                    border
                    border-green-400/30
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    font-semibold
                ">

                    Enrolled

                </span>

                }


            </div>





            <p className="
                text-blue-100
                mt-4
                leading-relaxed
                min-h-20
            ">

                {course.description}

            </p>





            {/* Information */}


            <div className="
                mt-5
                space-y-3
            ">


                <div className="
                    flex
                    justify-between
                    bg-white/10
                    rounded-xl
                    px-4
                    py-3
                ">

                    <span className="text-blue-200">
                        Duration
                    </span>


                    <span className="font-bold text-white">
                        {course.duration} weeks
                    </span>


                </div>





                <div className="
                    flex
                    justify-between
                    bg-gray-50
                    rounded-xl
                    px-4
                    py-3
                ">

                    <span className="text-gray-500">
                        Seats
                    </span>


                    <span className={`
                        font-semibold
                        ${
                            course.available_capacity > 0
                            ?
                            "text-green-600"
                            :
                            "text-red-600"
                        }
                    `}>

                        {course.available_capacity}

                    </span>


                </div>


            </div>







            {/* Action Button */}



            {

            myCourses.some(
                item=>item.course.id===course.id
            )


            ?

            (

            <button

            onClick={()=>unenrollCourse(course.id)}

            className="
                mt-6
                w-full
                bg-gradient-to-r
                from-red-500
                to-red-700
                hover:from-red-600
                hover:to-red-800
                shadow-lg
                transition-all
                duration-300
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
            "

            >

                Unenroll Course

            </button>


            )


            :


            course.available_capacity > 0
            ?

            (

            <button

            onClick={()=>enrollCourse(course.id)}

            className="
                mt-6
                w-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                hover:from-blue-600
                hover:to-indigo-700

                shadow-lg
                hover:shadow-blue-500/40
                transition-all
                duration-300
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
            "

            >

                Enroll Course

            </button>


            )


            :

            (

            <button

            disabled

            className="
                mt-6
                w-full
                bg-gray-700
                text-gray-300
                py-3
                rounded-xl
                font-semibold
            "

            >

                Course Full

            </button>


            )


            }



        </div>


        ))

        }


        </div>

        )

    }



</div>



);


}


export default StudentDashboard;