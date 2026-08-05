import {
    MdDashboard,
    MdLibraryBooks,
    MdAddCircle,
    MdEdit,
    MdQuiz,
    MdPeople
} from "react-icons/md";


function CourseSidebar({active,setActive}){


const menu=[

{
name:"Dashboard",
key:"dashboard",
icon:<MdDashboard size={22}/>
},

{
name:"Topics",
key:"topics",
icon:<MdLibraryBooks size={22}/>
},

{
name:"Add Topic",
key:"addTopic",
icon:<MdAddCircle size={22}/>
},

{
name:"Update Course",
key:"update",
icon:<MdEdit size={22}/>
},

{
name:"Quiz",
key:"quiz",
icon:<MdQuiz size={22}/>
},

{
name:"Enrolled Student",
key:"enrolled",
icon:<MdPeople size={22}/>
}

]



return(

<div className="
w-72
bg-white
shadow-xl
border-r
p-6
">


<h1 className="
text-2xl
font-bold
text-indigo-700
mb-8
">

Course Panel

</h1>



{
menu.map(item=>(


<button

key={item.key}

onClick={()=>setActive(item.key)}

className={`
flex
items-center
gap-3
w-full
p-4
rounded-xl
mb-3
transition

${
active===item.key

?
"bg-indigo-600 text-white shadow-lg"

:
"hover:bg-indigo-50 text-gray-700"

}

`}

>


<span>

{item.icon}

</span>


<span className="font-medium">
{item.name}
</span>


</button>



))


}



</div>

)


}


export default CourseSidebar;