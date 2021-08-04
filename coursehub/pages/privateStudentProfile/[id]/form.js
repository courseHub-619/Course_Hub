import React, { useEffect, useState } from "react";
import Star from "react-rating-stars-component";
// import Star from "react-star-ratings";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/students/all`);
  const data = await response.json();
  const paths = data.map((student) => {
    let id = student.student_id;
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

const StarRating = ({ totalStars, stdId }) => {
  const router = useRouter();
  let [comment, setComment] = useState("");
  let [Sid, setid] = useState(stdId);
  const [starsSelected, selectStar] = useState(0);

  // const sendFeedback = async () => {
  //   console.log(starsSelected, comment);
  //   const feedback = await axios
  //     .put(`${process.env.NEXT_PUBLIC_SERVER}/teacher/form/feedback/${Sid}`, {
  //       body: {
  //         student_id: Sid,
  //         average: starsSelected,
  //         comment: comment,
  //       },
  //     })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // };

  const sendFeedback = async () => {
    console.log(starsSelected, comment);
    const feedback = await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/profile/student/form/feedback`, {
        Sid,
        starsSelected,
        comment,
      })
      .then((response) => {
        router.push(`/privateStudentProfile/${stdId}`);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  console.log(Sid, starsSelected, comment);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFsa3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className=" bg-gray-100 py-3 sm:max-w-xl sm:mx-auto">
          <div className=" min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold">
                Your opinion matters to us!
              </h2>
            </div>
            <div className="bg-gray-100 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-2 space-y-1">
                <span className="text-lg text-gray-800">
                  How was your overall experience
                </span>
                <div className="flex space-x-1">
                  {" "}
                  <div className="star-rating">
                    {[...Array(totalStars)].map((n, i) => (
                      <Star
                        key={i}
                        selected={i < starsSelected}
                        value={i}
                        size={30}
                        onChange={(e) => selectStar(e)}
                        className="w-20 h-20 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <input
                  rows="3"
                  className="p-4 text-gray-500 rounded-xl resize-none"
                  placeholder="Leave a message, if you want"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={() => {
                    sendFeedback();
                    Swal.fire(
                      "Done!",
                      "Thank you for your feedback",
                      "success"
                    );
                  }}
                  className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                >
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 bg-gray-100 flex items-center justify-center hover:bg-red-500">
              <Link href={`/privateStudentProfile/${Sid}`}>
                <a href="" className="text-gray-600 ">
                  Maybe later
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
