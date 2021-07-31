import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/admin/students/all");
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
  const tutor = await fetch(`http://localhost:4200/teacher/all/teachers`);
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

  const [id, setId] = React.useState(stdId);

  const [showModal, setShowModal] = React.useState(false);

  const [days, setdays] = React.useState(null);
  const [sessions, setsessions] = React.useState(null);

  const [day, setday] = React.useState(null);
  const [session, setsession] = React.useState(null);

  const availability = async (TId) => {
    const available1 = await fetch(
      `http://localhost:4200/reservaition/day/available/${TId}`
    );

    const available2 = await fetch(
      `http://localhost:4200/reservaition/session/available/${TId}`
    );
    const data1 = await available1.json();
    const data2 = await available2.json();

    let result = [];
    let result2 = [];
    for (var key in data1) {
      if (data1[key] === true) {
        result.push(key);
      }
    }

    for (var key in data2) {
      if (data2[key] === true) {
        result2.push(key);
      }
    }
    setdays(result);
    setsessions(result2);
  };

  const checkBalance = async (price, teacherId, session, day) => {
    let test = false;
    console.log(price);
    const Balance = await fetch(
      `http://localhost:4200/reservaition/balance/${id}`
    );

    const data = await Balance.json();

    // if amount not sufficient
    if (data.wallet < price) {
      console.log("insuffisant amount");
      await Swal.fire("Error!", "insuffisant amount", "error");
      setShowModal(false);

      // if input is missing
    } else if (day === null || session === null) {
      console.log("Missed inputs");
      await Swal.fire("Error!", "day or session is missing", "error");
    } else if (data.wallet >= price) {
      console.log("sucess");

      const avail = await fetch(
        `http://localhost:4200/reservaition/available/${teacherId}`
      );
      const resAval = await avail.json();

      console.log(resAval, "ressssAvvvv");

      let Resdays = [];

      resAval.map((res) => {
        Resdays.push(res.day);
        // Ressessions.push(res.session);
      });

      console.log(Resdays, "daaayyzzzz");
      // console.log(Ressessions, "sesssionzzzzz");
      if (Resdays.length !== 0) {
        const SessAvail = await fetch(
          `http://localhost:4200/reservaition/available/${teacherId}/${day}`
        );

        const resSession = await SessAvail.json();

        console.log(resSession, "rsssssssSessionnnns");
        let Ressessions = [];
        resSession.map((res) => {
          Ressessions.push(res.session);
        });

        Ressessions.map((se) => {
          if (se === session) {
            console.log("reserved");
            test = true;
            setShowModal(false);
            return;
          }
        });
      }
      if (test === true) {
        Swal.fire("Error!", "Session reserved, try another", "error");
        setShowModal(false);
        return;
      } else {
        await axios
          .put(
            `http://localhost:4200/reservaition/balance/${id}/${price}/${teacherId}`
          )
          .then(async (result) => {
            console.log(result);
            await axios
              .post(`http://localhost:4200/reservaition/scheduel`, {
                id,
                teacherId,
                session,
                day,
              })
              .then(async (res) => {})
              .catch((err) => console.log(err));
            await Swal.fire(
              "Done!",
              "You have successfully reserved your session.",
              "success"
            );
            setShowModal(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // console.log(session, day);

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
                    <Image src={blog.Image} height={200} width={500} />
                  </div>

                  <div className=" relative pl-4 w-80">
                    <header className="border-b border-grey-400">
                      <a
                        href="#"
                        className=" cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                      >
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
                            {blog.body}
                          </span>
                        </p>
                      </div>
                      <div className="pt-1 ">
                        <div className="text-sm mb-2 flex  flex-start items-center">
                          <p className="font-bold ml-2">
                            <span className="text-gray-700 font-medium text-2xl ml-3">
                              price: {blog.price} dt
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex place-content-end justify-between md:gap-8 gap-4 pr-4 pt-8 pb-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          availability(teacher.teacher_id);
                        }}
                        className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                      >
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

                <>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="text-center relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className=" text-center border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className=" text-center flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <h3 className="text-3xl font-semibold text-center">
                                Modal Title
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                Choose the day
                              </p>
                              {days &&
                                days.map((day) => {
                                  return (
                                    <button
                                      onClick={() => setday(day)}
                                      className="p-2 text-blue-400"
                                    >
                                      {day}
                                    </button>
                                  );
                                })}

                              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                Choose the session
                              </p>
                              {sessions &&
                                sessions.map((session) => {
                                  return (
                                    <button
                                      onClick={() => setsession(session)}
                                      className="p-2 text-blue-400"
                                    >
                                      {session}
                                    </button>
                                  );
                                })}
                            </div>
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              Price: {blog.price} dt
                            </p>
                            <p className=" p-2 text-xs w-80">
                              NB: Sessions start from 8:00 AM, so session one is
                              from 8 to 10 Am , session two is from 10 to 12 pm,
                              session three from 2 to 4pm, session four from 4
                              to 6 pm, session five from 6 to 8 pm and the last
                              session from 8 to 10 pm
                            </p>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  checkBalance(
                                    blog.price,
                                    teacher.teacher_id,
                                    session,
                                    day
                                  );
                                }}
                              >
                                Proceed to payment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </>
              </div>
            );
          }
        });
      })}
    </>
  );
};

export default Post;
