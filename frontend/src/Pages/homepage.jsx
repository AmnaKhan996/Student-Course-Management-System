import { Link } from "react-router-dom";

function Home(){

return(

<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 text-white">


{/* Navbar */}

<nav className="flex justify-between items-center px-10 py-6">

<h1 className="text-3xl font-bold">
Student Course Management
</h1>


<div className="space-x-4">

<Link to="/login">

<button className="px-6 py-2 rounded-xl bg-white text-blue-700 font-semibold hover:bg-gray-200">
Login
</button>

</Link>


<Link to="/signup">

<button className="px-6 py-2 rounded-xl border border-white hover:bg-white hover:text-blue-700">
Signup
</button>

</Link>

</div>


</nav>



{/* Hero Section */}

<div className="flex flex-col items-center justify-center text-center mt-32">


<h2 className="text-6xl font-bold max-w-4xl">
Manage Your Courses Easily
</h2>


<p className="text-xl mt-6 text-blue-100 max-w-2xl">
A complete platform where students can explore courses,
enroll in classes and manage their learning journey.
</p>


<Link to="/signup">

<button className="mt-10 px-10 py-4 bg-white text-blue-700 rounded-full text-lg font-bold hover:scale-105 transition">

Get Started

</button>

</Link>


</div>


</div>

)

}

export default Home;