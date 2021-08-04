import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { storage } from "../../firebase";
import Swal from "sweetalert2";

export default function SignIn() {
  const router = useRouter();
  const [signupdata, setsignupdata] = useState({
    email: "",
    userName: "",
    password: "",
    education: "",
    age: 0,
    image: "",
    wallet: 0,
    token: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "age" ? +e.target.value : e.target.value;

    setsignupdata({ ...signupdata, [name]: value });
  };

  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);

  const handleUploadImage = async (e) => {
    console.log("is that the link", e.target.files[0]);
    let file = e.target.files[0];
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressImage(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log(file.name);
        storage
          .ref("images/")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url, "urlllllllllllllllllllllllllllllllll");
            setUrl(url);
          });
      }
    );
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
      .post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/student/signUp`, {
        signupdata,
        url,
      })

      .then(async (response) => {
        console.log("new user was created successfully");
        console.log(response);
        await Swal.fire(
          "Created!",
          "You have successfully created an account.",
          "success"
        );
        await router.push("/student/login");
      })
      .catch((err) => {
        console.log("whyyyyy");
        console.log(err);
      });
  };
  return (
    <div className="flex  p-8">
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
              name="education"
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
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  handleUploadImage(e);
                }}
                className="hidden"
              />
            </label>

            <progress
              max="100"
              value={progressImage}
              className="bg-teal text-xs leading-none py-1 text-center text-white"
              style={{ width: "100%" }}
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
              <button
                className={"justify-center text-blue-500 hover:underline"}
              >
                Already Have account? Login To Your Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
