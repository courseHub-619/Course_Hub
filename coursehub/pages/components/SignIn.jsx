import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignIn() {
  const [signupdata, setsignupdata] = useState({
    email: "",
    userName: "",
    password: "",
    education: "",
    age: "",
    image: "",
  });
  const handleChange = (e) => {
    setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
    console.log(signupdata, e.target.value);
  };

  const sendForm = () => {
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

    axios
      .post(" http://localhost:4200/api/auth/signUp", signupdata)

      .then((response) => {
        console.log("new user was created successfully");
      })
      .catch((err) => {
        console.log("whyyyyy");
        console.log(err);
      });
  };
  return (
    <div>
      <h1>signin</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="userName"
          name="userName"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="education"
          name="education"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="age"
          name="age"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="image"
          name="image"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={sendForm}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        SignIn
      </button>
    </div>
  );
}
