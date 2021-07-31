import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";

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
  const id = context.params.id;
  const data = await fetch(`http://localhost:4200/reservaition/scheduel/${id}`);
  const scheduel = await data.json();

  const student = await fetch("http://localhost:4200/admin/students/all");
  const students = await student.json();

  return {
    props: {
      id,
      scheduel,
      students,
    },
  };
};

const scheduel = ({ id, scheduel, students }) => {
  const [Id, setId] = useState(id);
  const router = useRouter();

  console.log(scheduel, "scheeee");

  const deleteScheduel = async (sId) => {
    await axios
      .delete(`http://localhost:4200/reservaition/scheduel/delete/${sId}`)
      .then((res) => {
        console.log(res.data);
        router.push(`/privateTeacherProfile/${Id}/scheduel`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return scheduel.map((data) => {
    return students.map((std) => {
      if (std.student_id === data.student) {
        return (
          <div className=" flex justify-between w-3/4 bg-white shadow-2xl h-55 mx-auto mt-20 p-5">
            <div className=" relative flex justify-around">
              <Image
                src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGNvdXJzZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                height={100}
                width={250}
                className="my-auto h-24 w-24 border-gray-500 rounded-full border-4"
              />
              <div>
                <div className="flex justify-between">
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    Day :
                  </p>
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    {data.day}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    session :
                  </p>
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    {data.session}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    student name :
                  </p>
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    {std.userName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    student email:
                  </p>
                  <p className="flex static text-justify text-xs sm:text-sm lg:text-lg my-auto p-3">
                    {std.email}
                  </p>
                </div>
                <button
                  onClick={() => deleteScheduel(data.scheduel_id)}
                  className=" flex justify-center border-t-2 border-gray-100 font-medium text-gray-600 py-2 px-2 hover:bg-red-500 transition duration-150"
                >
                  Delete session
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  });
};

export default scheduel;
