import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

    if(formData.password.length < 8){
    toast.error("Password must be at least 8 characters long");
    return;
  }

  const userData = {
    name: formData.name,
    username: formData.username,
    password: formData.password
  };

  try {

    const response = await axios.post(
      "http://localhost:8000/user/create",
      userData
    );

    console.log("User Created:", response.data);

    alert("Account created successfully");


  } catch (error) {

    console.log(error);

    alert("Signup failed");

  }
};


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500">


      {/* Signup Card */}

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">


        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-indigo-700">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join Student Course Management System
          </p>

        </div>



        <form onSubmit={handleSubmit}>


          {/* Name */}

          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>


            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

          </div>




          {/* Username */}

          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>


            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

          </div>




          {/* Password */}

          <div className="mb-6">

            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>


            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

          </div>




          {/* Button */}

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-800 transition duration-300"
          >

            Create Account

          </button>


        </form>




        {/* Login Link */}

        <p className="text-center text-gray-600 mt-8">

          Already have an account?

          <Link 
            to="/login"
            className="text-indigo-700 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>



      </div>


    </div>

  );
}


export default Signup;