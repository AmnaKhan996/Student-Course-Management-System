import {useState} from "react";
import {useParams} from "react-router-dom";
import CourseSidebar from "../../components/CourseSidebar";
import CourseOverview from "../../components/CourseOverview";
import TopicManagement from "../../components/Topics";
import AddTopic from "../../components/AddTopic";
import UpdateCourse from "../../components/UpdateCourse";
import ReviewQuizzes from "../../pages/Quiz/ReviewQuizzes";
import EnrolledStudents from "../Student/EnrolledStudents";


function CourseDashboard(){

const {courseId}=useParams();


const [active,setActive]=useState("dashboard");



const renderComponent=()=>{


switch(active){


case "dashboard":

return <CourseOverview courseId={courseId}/>;


case "topics":

return <TopicManagement courseId={courseId}/>;


case "addTopic":

return <AddTopic courseId={courseId}  close={()=>setActive("dashboard")}/>;


case "update":

return <UpdateCourse courseId={courseId}/>;


case "quiz":

return <ReviewQuizzes courseId={courseId}/>;

case "enrolled":

return <EnrolledStudents courseId={courseId}/>;


default:

return <CourseOverview courseId={courseId}/>

}



}



return(

<div className="
flex
min-h-screen
bg-slate-100
">


<CourseSidebar

active={active}

setActive={setActive}

/>



<div className="
flex-1
p-8
">


{
renderComponent()
}


</div>



</div>


)


}


export default CourseDashboard;