function CourseTable({ courses, deleteCourse, onRowClick }) {

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-200
            overflow-hidden
        ">






            <div className="overflow-x-auto">


                <table className="w-full">


                    <thead>


                        <tr className="
                            bg-gradient-to-r
                            from-indigo-600
                            to-purple-600
                            text-white
                        ">


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                ID
                            </th>


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                Course
                            </th>


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                Description
                            </th>


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                Duration
                            </th>


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                Capacity
                            </th>


                            <th className="
                                px-6
                                py-4
                                text-left
                                text-sm
                                font-semibold
                            ">
                                Action
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                    {
                        courses.length === 0

                        ?

                        (

                            <tr>

                                <td
                                colSpan="6"
                                className="
                                text-center
                                py-12
                                text-gray-500
                                "
                                >

                                    No Courses Found

                                </td>


                            </tr>

                        )


                        :

                        courses.map((course)=>(


                            <tr

                            key={course.id}

                            onClick={()=>onRowClick(course)}

                            className="
                            hover:bg-indigo-50
                            border-gray-100
                            transition
                            cursor-pointer
                            "

                            >



                                {/* ID */}

                                <td className="
                                    px-6
                                    py-5
                                    text-gray-600
                                    font-medium
                                ">

                                    #{course.id}

                                </td>





                                {/* Course Name */}

                                <td className="
                                    px-6
                                    py-5
                                ">


                                    <p className="
                                    font-semibold
                                    text-gray-800
                                    ">

                                        {course.title}

                                    </p>


                                    <p className="
                                    text-xs
                                    text-gray-400
                                    mt-1
                                    ">

                                        Course

                                    </p>


                                </td>





                                {/* Description */}

                                <td className="
                                    px-6
                                    py-5
                                    max-w-xs
                                ">

                                    <p className="
                                    text-gray-600
                                    truncate
                                    ">

                                        {course.description}

                                    </p>


                                </td>






                                {/* Duration */}

                                <td className="
                                    px-6
                                    py-5
                                ">


                                    <span className="
                                    bg-blue-100
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                    ">

                                        {course.duration} Weeks

                                    </span>


                                </td>






                                {/* Capacity */}

                                <td className="
                                    px-6
                                    py-5
                                ">


                                    <span className="
                                    bg-green-100
                                    text-green-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                    ">

                                        {course.capacity}

                                    </span>


                                </td>






                                {/* Delete Button */}

                                <td className="
                                    px-6
                                    py-5
                                ">


                                    <button

                                    onClick={(e)=>{

                                        e.stopPropagation();

                                        deleteCourse(course.id);

                                    }}

                                    className="
                                    bg-red-50
                                    text-red-600
                                    border
                                    border-red-200
                                    px-4
                                    py-2
                                    rounded-lg
                                    font-medium
                                    text-sm
                                    hover:bg-red-600
                                    hover:text-white
                                    transition
                                    duration-200
                                    "

                                    >

                                        Delete

                                    </button>


                                </td>



                            </tr>


                        ))

                    }


                    </tbody>



                </table>


            </div>


        </div>

    );

}


export default CourseTable;