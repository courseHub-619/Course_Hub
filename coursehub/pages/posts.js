import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// export const getStaticPaths = async () => {

// }

const Post = () => {
  const [blogs, setBlogs] = useState({});

  return (
    <div className="bg-white overflow-hidden shadow-none">
      <div className="grid grid-cols-3 min-w-full h-80">
        <div className="col-span-2 w-full">
          {/* post image */}
          <img
            className="w-full max-w-full min-w-full"
            src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="Description"
          />
        </div>

        <div className="col-span-1 relative pl-4">
          <header className="border-b border-grey-400">
            <a
              href="#"
              className=" cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            >
              {/* user image  */}
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                className="h-16 w-16 rounded-full object-cover"
                alt="user"
              />
              {/* user name */}
              <p className="block ml-2 font-bold">user name</p>
            </a>
          </header>

          <div>
            <div className="pt-1">
              <div className="text-sm mb-2 flex flex-start items-center">
                <p className="font-bold ml-2">
                  <span className="text-gray-700 font-medium text-2xl ml-3">
                    title
                  </span>
                </p>
              </div>
            </div>
            <div className="text-sm mb-2 flex flex-start items-center">
              <p className="font-bold ml-2">
                <span className="text-gray-700 font-medium ml-1">
                  post body
                </span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 pl-4">
            <div className="pt-4">
              <div className="mb-2">
                <div className="flex items-center">
                  <span className="mr-3 inline-flex items-center cursor-pointer">
                    <svg
                      className="fill-heart text-gray-700 inline-block h-7 w-7 heart"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                  <span className="mr-3 inline-flex items-center cursor-pointer">
                    <svg
                      className="text-gray-700 inline-block h-7 w-7 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </span>
                </div>
                <span className="text-gray-600 text-sm font-bold">
                  2344 Likes
                </span>
              </div>
              <span className="block ml-2 text-xs text-gray-600">
                5 minutes
              </span>
            </div>

            <div className="pt-4 pb-1 pr-3">
              <div className="flex items-start">
                <textarea
                  className="w-full resize-none outline-none appearance-none"
                  aria-label="Agrega un comentario..."
                  placeholder="Agrega un comentario..."
                  autoComplete="off"
                  autoCorrect="off"
                  //   style="height: 36px;"
                ></textarea>
                <button className="mb-2 focus:outline-none border-none bg-transparent text-blue-600">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
