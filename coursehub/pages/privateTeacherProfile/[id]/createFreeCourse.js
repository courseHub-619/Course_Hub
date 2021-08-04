import { storage } from "../../../firebase";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/teacher/all`);
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
  const id = context.params.id;

  return {
    props: {
      id,
    },
  };
};

const Post = ({ id }) => {
  console.log(id, "ahayaaaaaaaa");

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [progressFile, setProgressFile] = useState(0);

  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [body, setBody] = useState(null);
  const handleInput = (e, set) => {
    set(e.target.value);
  };

  const handleUploadImage = async (e) => {
    // var metadata = {
    //     contentType: 'image/png'
    // };
    console.log("is that the link", e.target.files[0]);
    let file = e.target.files[0];
    await setImage(file);

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
  const handleUploadfile = async (e) => {
    let file = e.target.files[0];
    await setFile(file);

    const uploadTask = storage.ref(`file/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressFile(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("file")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url, "file");
            setFileUrl(url);
          });
      }
    );
  };

  const postCourse = () => {
    console.log(fileUrl, "url file");
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/freecourse/post`, {
        title,
        category,
        body,
        fileUrl,
        url,
        id,
      })
      .then(async (res) => {
        await Swal.fire(
          "Created!",
          "Thank you for sharing information.",
          "success"
        );
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHdoaXRlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="font-mono mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div>
              <Image
                src="/post2.jpg"
                width={450}
                height={820}
                alt={""}
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              />
            </div>

            <div className="w-full lg:w-7/12 bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">
                Spread the knowledge!
              </h3>
              <div className="px-8 pt-6 pb-8 mb-5 bg-gray-100 rounded">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Title
                  </label>
                  <input
                    onChange={(e) => handleInput(e, setTitle)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Course title"
                  />
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Category
                  </label>
                  <input
                    onChange={(e) => handleInput(e, setCategory)}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Course category"
                  />
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700 h-full">
                    Body
                  </label>
                  <textarea
                    onChange={(e) => handleInput(e, setBody)}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Type your course here"
                  />
                </div>

                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700 ">
                    Attachement
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleUploadfile(e);
                    }}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Upload attachement"
                  />
                  <progress
                    max="100"
                    value={progressFile}
                    className="bg-teal text-xs leading-none py-1 text-center text-white"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 text-center"></div>
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className=" mb-2 text-sm font-bold text-gray-700 ">
                    Image
                  </label>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    handleUploadImage(e);
                  }}
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Upload image"
                />

                <progress
                  max="100"
                  value={progressImage}
                  className="bg-teal text-xs leading-none py-1 text-center text-white"
                  style={{ width: "100%" }}
                />

                <hr className="mb-6 border-t" />
                <div className="mb-6 text-center">
                  <button
                    onClick={async () => {
                      await postCourse();
                      await Swal.fire(
                        "Created!",
                        "Thank you for sharing information.",
                        "success"
                      );
                    }}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
