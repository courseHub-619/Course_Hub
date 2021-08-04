import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:4200/teacher/all/blogs`);
  const blogs = await res.json();
  const tutor = await fetch(`http://localhost:4200/teacher/all/teachers`);
  const teachers = await tutor.json();
  return {
    props: {
      blogs,
      teachers,
    },
  };
};

const Post = ({ teachers, blogs }) => {
  return (
    <>
      {teachers.map((teacher, index) => {
        return blogs.map((blog, index) => {
          if (teacher.teacher_id === blog.author_id) {
            return (
              <div
                key={index}
                className=" flex  max-w-4xl my-10 bg-gray-100 shadow-md rounded-lg overflow-hidden mx-auto"
              >
                <div className=" grid-cols-3 min-w-full flex justify-between ">
                  <div className="text-gray-400  font-medium text-sm mb-6 mt-6 mx-3 px-2 min-h-full max-w-lg">
                    <Image
                      className="rounded object-cover "
                      // src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                      // src="https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg"
                      // src="https://ychef.files.bbci.co.uk/live/624x351/p03gg1lc.jpg"
                      // src="https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?size=626&ext=jpg&ga=GA1.2.1686120001.1627257600"
                      alt="Description"
                      src={blog.Image}
                      width={300}
                      height={150}
                    />
                  </div>

                  <div className=" relative pl-4 w-80">
                    <header className="border-b border-grey-400">
                      <a
                        href="#"
                        className=" cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                      >
                        <Image
                          // src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                          className="h-16  w-16 rounded-full object-cover"
                          alt="user"
                          src={teacher.image}
                          height={200}
                          width={150}
                        />
                        <p className="block ml-2 font-bold">
                          {teacher.userName}
                        </p>
                      </a>
                    </header>
                    <div>
                      <div className="pt-1 ">
                        <div className="text-sm mb-2 flex  flex-start items-center">
                          <p className="font-bold ml-2">
                            <span className="text-gray-700 font-medium text-2xl ml-3">
                              {blog.title}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-sm mb-2 min-h-full flex flex-start items-center">
                        <p className="font-bold ml-2">
                          <span className="text-gray-700 mx-auto font-medium ml-1">
                            {blog.body}{" "}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex place-content-end justify-between md:gap-8 gap-4 pr-4 pt-8 pb-4">
                      <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                        button 1
                      </button>
                      <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                        button 2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      })}
    </>
  );
};

export default Post;
