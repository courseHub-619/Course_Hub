import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function SignIn() {
  const router = useRouter();

  const [monday, setmonday] = useState(false);
  const [styleMonday, setStyleMonday] = useState(
    "flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100"
  );

  const [tuesday, settuesday] = useState(false);
  const [styleTuesday, setStyleTuesday] = useState(
    "flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100"
  );

  const [wed, setwed] = useState(false);
  const [styleWed, setStyleWed] = useState(
    "flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100"
  );

  const [thurs, setthurs] = useState(false);
  const [styleThurs, setStyleThurs] = useState(
    "flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
  );

  const [friday, setfriday] = useState(false);
  const [styleFriday, setStyleFriday] = useState(
    "flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-yellow-500 hover:text-gray-100"
  );

  const [saturday, setsaturday] = useState(false);
  const [styleSat, setStyleSat] = useState(
    "flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-indigo-500 hover:text-gray-100"
  );

  const [sunday, setsunday] = useState(false);
  const [styleSunday, setStyleSunday] = useState(
    "flex items-center p-4 bg-purple-200 rounded-lg shadow-xs cursor-pointer hover:bg-orange-500 hover:text-gray-100"
  );

  const [One, setOne] = useState(false);
  const [styleOne, setStyleOne] = useState(
    "flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100"
  );

  const [Two, setTwo] = useState(false);
  const [styleTwo, setStyleTwo] = useState(
    "flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100"
  );

  const [Three, setThree] = useState(false);
  const [styleThree, setStyleThree] = useState(
    "flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100"
  );

  const [Four, setFour] = useState(false);
  const [styleFour, setStyleFour] = useState(
    "flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
  );

  const [Five, setFive] = useState(false);
  const [styleFive, setStyleFive] = useState(
    "flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-yellow-500 hover:text-gray-100"
  );

  const [Six, setSix] = useState(false);
  const [styleSix, setStyleSix] = useState(
    "flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-indigo-500 hover:text-gray-100"
  );

  const handleDay = (set, status, setStyle, style) => {
    if (status === false) {
      set(true);
      setStyle(
        "flex items-center p-4 bg-green-500 rounded-lg shadow-xs cursor-pointer  hover:text-gray-100"
      );
    } else if (status === true) {
      set(false);
      setStyle(style);
    }
  };
  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);

  const [signupdata, setsignupdata] = useState({
    email: "",
    userName: "",
    password: "",
    education: "",
    age: "",
    image: url,
    wallet: 0,
    description: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;

    const value = name === "age" ? +e.target.value : e.target.value;
    setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
    console.log(signupdata, e.target.value);
  };

  const sendForm = (e) => {
    e.preventDefault();

    if (
      signupdata.userName === "" ||
      signupdata.password === "" ||
      signupdata.email === "" ||
      signupdata.education === "" ||
      signupdata.age === null ||
      signupdata.image === "" ||
      signupdata.description === ""
    ) {
      console.log("some inputs are empty !!");
    }
    console.log(signupdata);
    signupdata.age = Number(signupdata.age);

    const data = {
      monday: monday,
      tuesday: tuesday,
      wednesday: wed,
      thursday: thurs,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      one: One,
      two: Two,
      three: Three,
      four: Four,
      five: Five,
      six: Six,
      signupdata: signupdata,
      url: url,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/teacher/signUp`, data)

      .then(async (response) => {
        console.log(response);
        console.log("new user was created successfully");
        await Swal.fire(
          "Created!",
          "You have successfully created an account.",
          "success"
        );
        await router.push("/teacher/login");
      })
      .catch((err) => {
        console.log("whyyyyy");
        console.log(err);
      });
  };

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

  console.log(signupdata.description, "here");
  return (
    <div className=" flex p-4">
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
            <label className="text-left">Bio:</label>
            <input
              name="description"
              type="test"
              onChange={handleChange}
              placeholder="Describe yourself briefly"
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
            <label className="text-left"> Weekdays available:</label>
          </form>
          <section className="container mx-auto px-6 my-1 flex flex-wrap -m-4">
            <div className="p-2 md:w-40 ">
              <p href="#" className={styleMonday}>
                <svg
                  className="h-6 fill-current hover:text-gray-100 "
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setmonday,
                        monday,
                        setStyleMonday,
                        "flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Monday
                  </button>
                </div>
              </p>
            </div>

            <div className="p-2 md:w-40 ">
              <div className={styleTuesday}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        settuesday,
                        tuesday,
                        setStyleTuesday,
                        "flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100"
                      )
                    }
                    className="text-xs font-medium ml-2 "
                  >
                    Tuesday
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleWed}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setwed,
                        wed,
                        setStyleWed,
                        "flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Wednesday
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2 md:w-40 ">
              <div className={styleThurs}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setthurs,
                        thurs,
                        setStyleThurs,
                        "flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Thursday
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleFriday}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>{" "}
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setfriday,
                        friday,
                        setStyleFriday,
                        "flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium text-uppercase ml-2 "
                  >
                    Friday
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleSat}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>{" "}
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setsaturday,
                        saturday,
                        setStyleSat,
                        "flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Saturday
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleSunday}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>{" "}
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setsunday,
                        sunday,
                        setStyleSunday,
                        "flex items-center p-4 bg-purple-200 rounded-lg shadow-xs cursor-pointer hover:bg-purple-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Sunday
                  </button>
                </div>
              </div>
            </div>
          </section>

          <label className="text-left"> Sessions available:</label>
          <section className="container mx-auto px-6 my-1 flex flex-wrap -m-4">
            <div className="p-2 md:w-40 ">
              <p href="#" className={styleOne}>
                <svg
                  className="h-6 fill-current hover:text-gray-100 "
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setOne,
                        One,
                        setStyleOne,
                        "flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Session one: 8-10 AM
                  </button>
                </div>
              </p>
            </div>

            <div className="p-2 md:w-40 ">
              <div className={styleTwo}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setTwo,
                        Two,
                        setStyleTwo,
                        "flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100"
                      )
                    }
                    className="text-xs font-medium ml-2 "
                  >
                    Session two: 10-12 AM
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleThree}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setThree,
                        Three,
                        setStyleThree,
                        "flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Session three: 2-4 PM
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2 md:w-40 ">
              <div className={styleFour}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setFour,
                        Four,
                        setStyleFour,
                        "flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Session four: 4-6 PM
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleFive}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>{" "}
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setFive,
                        Five,
                        setStyleFive,
                        "flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium text-uppercase ml-2 "
                  >
                    Session five: 6-8 PM
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 md:w-40 ">
              <div className={styleSix}>
                <svg
                  className="h-6 fill-current hover:text-gray-100"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>{" "}
                <div>
                  <button
                    onClick={() =>
                      handleDay(
                        setSix,
                        Six,
                        setStyleSix,
                        "flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100"
                      )
                    }
                    className=" text-xs font-medium ml-2 "
                  >
                    Session six: 8-10 PM
                  </button>
                </div>
              </div>
            </div>
          </section>

          <form>
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
            <form action="http://localhost:3000/teacher/login">
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
