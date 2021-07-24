import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";

const makePost = () => {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);

  const handleUploadImage = async (e) => {
    console.log(e.target.files[0]);
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
        console.log(file.name);
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

  let submitValue = () => {
    let postDetails = {
      title: title,
      body: body,
      teacher_id: 0,
      image: url,
    };
    console.log(postDetails);

    axios
      .post(`http://localhost:4200/post`, {
        body: postDetails,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (

    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <div className="icons flex text-gray-500 m-2">

          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {body.length}/300
          </div>
        </div>
        <div className="flex justify-between">
          <input
            type="file"
            onChange={(e) => {
              handleUploadImage(e);
            }}
            className="w-100 px-3 py-1 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Upload image"
          />

        </div>
        <progress
          max="100"
          value={progressImage}
          className="bg-teal text-xs leading-none text-center text-white"
          style={{ width: "44%" }}
        />

        <div className="buttons flex">
          <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </button>
          <button
            onClick={submitValue}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default makePost;
