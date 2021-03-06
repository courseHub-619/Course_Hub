import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../../firebase";
import { useRouter } from "next/dist/client/router";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/admin/teacher/all");
  const data = await response.json();
  const paths = data.map((teacher) => {
    let id = teacher.teacher_id;
    // console.log("id", id)
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const teacherId = context.params.id;
  const teacher = await fetch(
    `http://localhost:4200/admin/teacher/one/${teacherId}`
  );
  const TeacherProfile = await teacher.json();

  return {
    props: {
      teacherId: teacherId,
      TeacherProfile: TeacherProfile,
    },
  };
};

const MakePost = ({ teacherId, TeacherProfile }) => {
  console.log(TeacherProfile);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [subjects, setSubjects] = useState([
    "science",
    "math",
    "web developpment",
    "english",
    "french",
  ]);
  let [updatedImage, setUpdatedImage] = useState(null);
  let [updatedProgressImage, setProgressUpdatedImage] = useState(0);
  let [updatedUrl, setUpdatedUrl] = useState(TeacherProfile.image);
  let [description, setDescription] = useState(TeacherProfile.image);
  let [subject, setSubject] = useState(TeacherProfile.education);

  const handleUploadImage = async (e) => {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    setImage(file);

    const uploadTask = storage.ref(`posts/${file.name}`).put(file);
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
        // console.log(file.name);
        storage
          .ref("posts/")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  //updating the already existant data
  let upload = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    setUpdatedImage(file);

    const uploadTask = storage.ref(`posts/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressUpdatedImage(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // console.log(file.name);
        storage
          .ref("posts/")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url, "whereeeeeeeeeeeeeeeeeeeeeeeee");
            setUpdatedUrl(url);
          });
      }
    );
  };

  const changeData = () => {
    // console.log(
    //   subject,
    //   updatedUrl,
    //   description,
    //   typeof id,
    //   "data sent to the back"
    // );
    axios
      .put(`http://localhost:4200/teacher/update/profile/${teacherId}`, {
        url: updatedUrl,
        subject: subject,
        description: description,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-200 items-center justify-center  mt-32 mb-32">
        <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
          <div className="flex justify-center py-4">
            <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                change description
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              description
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder="Input 1"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {subjects &&
                subjects.map((subject, index) => {
                  return <option key={index}>{subject}</option>;
                })}
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              Upload Photo
            </label>
            <div className="flex items-center justify-center w-full">
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
                    upload(e);
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
              Cancel
            </button>
            <button
              onClick={changeData}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* end of the upload */}
    </div>
  );
};

export default MakePost;
