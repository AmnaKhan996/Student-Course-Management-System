import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login(){

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });


  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      const response = await axios.post(
        "http://localhost:8000/user/login",
        formData
      );


      const token = response.data.access_token;


      // save token
      localStorage.setItem("token", token);


      toast.success("Login successful");

     const role = response.data.role;

    console.log("User role:", role);

    if(role==="admin"){
            navigate("/adminDashboard");
        }
     else{
            navigate("/studentDashboard");
        }

    }
    catch(error){

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.detail || "Login failed"
      );

    }

  };



  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">


      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">


        <h1 className="text-4xl font-bold text-center text-indigo-700">
          Welcome Back
        </h1>


        <p className="text-center text-gray-500 mt-3">
          Login to continue learning
        </p>



        <form onSubmit={handleSubmit}>


          <input

            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Email"

            className="w-full mt-8 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"

            required

          />



          <input

            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"

            className="w-full mt-4 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"

            required

          />



          <button

            type="submit"

            className="w-full mt-6 bg-indigo-700 text-white py-3 rounded-xl hover:bg-indigo-800 transition"

          >

            Login

          </button>



        </form>



        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link 
            to="/signup"
            className="text-indigo-700 font-semibold ml-2"
          >
            Signup
          </Link>

        </p>


      </div>


    </div>

  )

}


export default Login;