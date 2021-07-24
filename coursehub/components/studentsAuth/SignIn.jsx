import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignIn() {
  const [signupdata, setsignupdata] = useState({
    email: "",
    userName: "",
    password: "",
    education: "",
    age: 0,
    image: "",
    wallet : 0
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "age" ? +e.target.value : e.target.value;


    setsignupdata({ ...signupdata, [name]: value });
  };

  const sendForm = (e) => {
    e.preventDefault();

    if (
      signupdata.userName === "" ||
      signupdata.password === "" ||
      signupdata.email === "" ||
      signupdata.education === "" ||
      signupdata.age === null ||
      signupdata.image === ""
    ) {
      console.log("some inputs are empty !!");
    }
    signupdata.age = Number(signupdata.age);

    axios
      .post(" http://localhost:4200/api/auth/student/signUp", signupdata)

      .then((response) => {
        console.log("new user was created successfully");
      })
      .catch((err) => {
        console.log("whyyyyy");
        console.log(err);
      });
  };
  return (
    <figure className="h-screen flex bg-gray-100">
    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
      <blockquote className="text-2xl font-medium text-center">
        <p className="text-lg font-semibold">Welcome to CourseHub</p>
      </blockquote>
      
      <div className="text-primary m-6">
    <div className="flex items-center mt-3 justify-center">
      <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
        
Create your account
      </h1>
    </div>
    <form>
      <label className="text-left">email:</label>
      <input
        name="email"
        type="text"
        onChange={handleChange}
        placeholder="email"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      <label className="text-left">username:</label>
       <input
        name="userName"
        type="text"
        onChange={handleChange}
        placeholder="userName"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      <label>Password:</label>
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      <label className="text-left">education:</label>
            <input
        name="eeducation"
        type="text"
        onChange={handleChange}
        placeholder="education"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      <label className="text-left">age:</label>
        <input
        name="age"
        type="number"
        onChange={handleChange}
        placeholder="age"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      <label className="text-left">image:</label>
       <input
        name="image"
        type="text"
        onChange={handleChange}
        placeholder="image"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
  <label className="text-left">availability:</label>
        <input
        name="availability"
        type="text"
        onChange={handleChange}
        placeholder="availability"
        className={
          "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
        }
      />
      
      <div className="flex items-center mt-3 justify-center">
        <button
          className={
            "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
          }
          value="Login"
          onClick={sendForm}
        >
          SignUp
        </button>
      </div>
    </form>
    <div className="flex items-center mt-3 justify-center">
    <form action="http://localhost:3000/student/login">
    <button className={"justify-center text-blue-500 hover:underline"} >
      Already Have account? Login To Your Account
    </button>
    </form>
    </div>
  </div>
      
    </div>
  </figure>
  );
}
