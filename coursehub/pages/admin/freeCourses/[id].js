import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/freecourse/all`);
  const data = await response.json();
  const paths = data.map((course) => {
    let id = course.freeCourse_id;
    console.log("id", id);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/freecourse/all/${id}`);
  const data = await res.json();

  const teacher_id = context.params.id;
  const teacher = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/admin/freecourse/teacher/${id}`
  );
  const TeacherName = await teacher.json();

  const att_id = context.params.id;
  console.log(att_id, "attachement id");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/admin/freecourse/attachement/${att_id}`
  );
  const attachement = await response.json();

  return {
    props: {
      course: data,
      attachement: attachement,
      teacher: TeacherName,
    },
  };
};

const Course = ({ course, attachement, teacher }) => {
  console.log(attachement);
  const [status, setStatus] = useState(course.Status);
  const router = useRouter();
  // console.log(course.image, "image here")
  const Update = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/freeCourse/update/${course.freeCourse_id}`
      )
      .then((result) => {
        console.log(result);
        setStatus("Accepted");
      })
      .catch((err) => console.log(err));
  };
  const Delete = () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/freeCourse/delete/${course.freeCourse_id}`
      )
      .then((result) => {
        console.log(result);
        router.push("/admin/freeCourses");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <main className="mt-10 p-2">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {course.title}
            </h2>
            <p className="py-2 text-green-700 inline-flex items-center justify-center mb-2">
              {course.category}
            </p>
          </div>
          <p className="py-2 text-black text-xl inline-flex items-center justify-center mb-2">
            status: {status}
          </p>
          <Image
            src={course.image}
            width={1200}
            height={400}
            alt={""}
            className="w-full object-cover lg:rounded"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6"> {attachement.body} </p>
          </div>

          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm text-center">
            <div className="p-4 border-t border-b md:border md:rounded text-center">
              <div className="text-center">
                <Image
                  className="h-14 w-10 rounded-full mr-2 object-cover"
                  src={teacher.image}
                  width={160}
                  height={140}
                  alt={""}
                />
              </div>
              <div className="text-center ">
                <p className="font-semibold text-gray-700 text-m">
                  {" "}
                  {teacher.userName}{" "}
                </p>
                <p className="font-semibold text-gray-600 text-s"> Teacher </p>
                <div className=" flex justify-center">
                  <p className="font-semibold text-gray-600 text-xs p-2 ">
                    Overall rating:
                  </p>
                  <ReactStars
                    edit={false}
                    count={5}
                    size={20}
                    value={Number(teacher.Overall_rating)}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <Link href={`/admin/teachers/${teacher.teacher_id}`}>
                <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                  Check profile
                  <i className="bx bx-user-plus ml-2"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded inline-flex items-center">
          <span>
            <a href={attachement.attachement}>Download attachement</a>
          </span>
        </button>
        <button
          onClick={Update}
          className=" bg-gray-300 hover:bg-green-500 text-gray-800 font-bold p-2 rounded inline-flex items-center"
        >
          Accept course
        </button>
        <button
          onClick={Delete}
          className=" bg-gray-300 hover:bg-red-500 text-gray-800 font-bold p-2 rounded inline-flex items-center"
        >
          Delete course
        </button>
      </main>
    </div>
  );
};

export default Course;
