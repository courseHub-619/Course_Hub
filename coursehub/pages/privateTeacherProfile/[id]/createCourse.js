import { useState } from "react";
import axios from "axios";
import { storage } from "../../../firebase";

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
  const stdId = context.params.id;

  return {
    props: {
      stdId,
    },
  };
};

const Course = ({ stdId }) => {
  console.log(stdId, "ahahahahahahah");

  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progressImage, setProgressImage] = useState(0);
  const [price, setPrice] = useState(0);

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

  let submitValue = async () => {
    let postDetails = {
      title: title,
      body: body,
      teacher_id: stdId,
      image: url,
      price: price,
    };
    console.log(typeof postDetails.teacher_id);

    const sendPost = await axios
      .post(`http://localhost:4200/post`, {
        body: postDetails,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 py-4 shadow-lg max-w-2xl ">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
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
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col border-4 border-dashed w-full h-24 hover:bg-gray-100 hover:border-purple-300 group">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg
                className="w-10 h-10  text-purple-400 group-hover:text-purple-600"
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
            </div>
            <input
              type="file"
              onChange={(e) => {
                handleUploadImage(e);
              }}
              className="hidden"
            />
          </label>
        </div>
        <progress
          max="100"
          value={progressImage}
          className="bg-teal text-xs leading-none py-1 text-center text-white"
          style={{ width: "100%" }}
        />

        <div className="count ml-auto text-gray-400 text-xs font-semibold">
          {body.length}/300
        </div>
      </div>
      <input
        className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
        spellCheck="false"
        placeholder="Price"
        type="text"
        onChange={(e) => setPrice(e.target.value)}
      ></input>
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
  );
};

export default Course;
