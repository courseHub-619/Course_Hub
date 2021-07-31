import React, { useEffect, useState } from "react";
import Star from "react-rating-stars-component";
// import Star from "react-star-ratings";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

const StarRating = ({ totalStars }) => {
  const router = useRouter();
  const { id } = router.query;
  let [comment, setComment] = useState("");

  const [starsSelected, selectStar] = useState(0);

  const sendFeedback = async () => {
    console.log(starsSelected, comment);
    const feedback = await axios
      .put(`http://localhost:4200/teacher/form/feedback/${0}`, {
        body: {
          // student_id: 0,
          average: starsSelected,
          comment: comment,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-3xl font-semibold">
              Your opinion matters to us!
            </h2>
          </div>
          <div className="bg-gray-200 w-full flex flex-col items-center">
            <div className="flex flex-col items-center py-2 space-y-1">
              <span className="text-lg text-gray-800">
                How was the overall performance of the teacher
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
            {/* =========================================== */}
            <div className="w-3/4 flex flex-col">
              <input
                rows="3"
                className="p-4 text-gray-500 rounded-xl resize-none"
                placeholder="Leave a message, if you want"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={sendFeedback}
                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
              >
                Rate now
              </button>
            </div>
          </div>
          <div className="h-20 flex items-center justify-center">
            <a href="#" className="text-gray-600">
              Maybe later
            </a>
          </div>
        </div>

        <div className="mt-8 text-gray-700">your feedback helps us</div>
      </div>
    </div>
  );
};

export default StarRating;
