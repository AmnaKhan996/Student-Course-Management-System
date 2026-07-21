import { Link } from "react-router-dom";

function Home() {

return (

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-indigo-950
to-blue-900
text-white
">


{/* Navbar */}

<nav className="
flex
justify-between
items-center
px-10
py-6
max-w-7xl
mx-auto
">


<div className="flex items-center gap-3">


<div className="
w-12
h-12
rounded-xl
bg-indigo-500
flex
items-center
justify-center
text-2xl
font-bold
shadow-lg
">

SC

</div>


<h1 className="
text-2xl
font-bold
tracking-wide
">

StudentHub

</h1>


</div>





<div className="flex gap-4">


<Link to="/login">

<button

className="
px-6
py-3
rounded-xl
bg-white
text-indigo-700
font-semibold
hover:bg-gray-100
transition
shadow-lg
"

>

Login

</button>


</Link>





<Link to="/signup">

<button

className="
px-6
py-3
rounded-xl
border
border-white/40
hover:bg-white
hover:text-indigo-700
transition
font-semibold
"

>

Create Account

</button>


</Link>


</div>


</nav>





{/* Hero Section */}


<section className="
max-w-7xl
mx-auto
px-10
grid
md:grid-cols-2
gap-12
items-center
mt-20
">





<div>


<p className="
inline-block
px-4
py-2
rounded-full
bg-indigo-500/20
border
border-indigo-400/30
text-indigo-200
text-sm
mb-6
">

Modern Learning Platform

</p>





<h2 className="
text-6xl
font-extrabold
leading-tight
">

Manage Courses.
<br/>

<span className="text-indigo-400">

Grow Your Skills.

</span>


</h2>





<p className="
mt-6
text-lg
text-gray-300
leading-relaxed
max-w-xl
">

A complete student course management system where
students discover courses, enroll easily and track
their learning journey while administrators manage
courses efficiently.

</p>





<div className="
flex
gap-5
mt-10
">


<Link to="/signup">


<button

className="
px-8
py-4
rounded-xl
bg-indigo-500
hover:bg-indigo-600
font-bold
text-lg
shadow-xl
transition
"

>

Get Started

</button>


</Link>





<Link to="/login">


<button

className="
px-8
py-4
rounded-xl
border
border-white/30
hover:bg-white
hover:text-indigo-700
transition
font-semibold
"

>

Login

</button>


</Link>



</div>



</div>







{/* Right Side Card */}


<div className="
relative
">


<div className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
shadow-2xl
">


<h3 className="
text-2xl
font-bold
mb-6
">

Learning Dashboard

</h3>




<div className="
space-y-5
">



<div className="
bg-white/10
rounded-xl
p-5
">

<p className="text-gray-300 text-sm">
Available Courses
</p>

<p className="text-3xl font-bold">
120+
</p>

</div>





<div className="
bg-white/10
rounded-xl
p-5
">

<p className="text-gray-300 text-sm">
Active Students
</p>

<p className="text-3xl font-bold">
500+
</p>

</div>





<div className="
bg-white/10
rounded-xl
p-5
">

<p className="text-gray-300 text-sm">
Learning Progress
</p>


<div className="
w-full
bg-gray-700
rounded-full
h-3
mt-3
">


<div className="
bg-indigo-400
h-3
rounded-full
w-3/4
">

</div>


</div>


</div>



</div>


</div>



</div>



</section>








{/* Features */}


<section className="
max-w-7xl
mx-auto
px-10
mt-28
grid
md:grid-cols-3
gap-8
">


<div className="
bg-white/10
backdrop-blur-lg
rounded-2xl
p-8
border
border-white/10
">

<h3 className="
text-xl
font-bold
mb-3
">

Explore Courses

</h3>


<p className="text-gray-300">

Browse available courses and find the right
learning path.

</p>

</div>





<div className="
bg-white/10
backdrop-blur-lg
rounded-2xl
p-8
border
border-white/10
">


<h3 className="
text-xl
font-bold
mb-3
">

Easy Enrollment

</h3>


<p className="text-gray-300">

Enroll and manage your courses with one click.

</p>


</div>





<div className="
bg-white/10
backdrop-blur-lg
rounded-2xl
p-8
border
border-white/10
">


<h3 className="
text-xl
font-bold
mb-3
">

Admin Control

</h3>


<p className="text-gray-300">

Administrators can create, update and manage
courses easily.

</p>


</div>



</section>





<footer className="
text-center
text-gray-400
mt-20
pb-8
">

© 2026 StudentHub. All rights reserved.

</footer>



</div>

)

}


export default Home;