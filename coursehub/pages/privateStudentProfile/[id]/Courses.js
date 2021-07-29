import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/student/all");
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

  const res = await fetch(`http://localhost:4200/all/blogs`);
  const blogs = await res.json();
  const tutor = await fetch(`http://localhost:4200/all/teachers`);
  const teachers = await tutor.json();
  return {
    props: {
      blogs,
      teachers,
      stdId,
    },
  };
};

const Post = ({ teachers, blogs, stdId }) => {
  console.log(stdId, "ahayyaaaaaaaa");

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
                  <div className="text-gray-400 font-medium text-sm mb-6 mt-6 mx-3 px-2 min-h-full max-w-lg">
                    {/* <img
                      className="rounded justify-center"
                      // src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                      // src="https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg"
                      // src="https://ychef.files.bbci.co.uk/live/624x351/p03gg1lc.jpg"
                      // src="https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?size=626&ext=jpg&ga=GA1.2.1686120001.1627257600"
                      alt="Description"
                      src={blog.Image}
                    /> */}
                    <Image src={blog.Image} height={200} width={500} />
                  </div>

                  <div className=" relative pl-4 w-80">
                    <header className="border-b border-grey-400">
                      <a
                        href="#"
                        className=" cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                      >
                        {/* <img
                          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                          className="h-16 w-16 rounded-full object-cover"
                          alt="user"
                          src={teacher.image}
                        /> */}
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
                        Reserve a session
                      </button>
                      <Link
                        href={`/publicTeacherProfile/${teacher.teacher_id}`}
                      >
                        <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                          Check teacher profile
                        </button>
                      </Link>
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
