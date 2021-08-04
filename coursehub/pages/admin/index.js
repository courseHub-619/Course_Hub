import Card from "@material-ui/core/Card";
import Image from "next/image";
import Link from "next/link";
import { HiArrowCircleRight } from "react-icons/hi";
import ReactStars from "react-rating-stars-component";

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/freeCourse/all`);
  const dataOne = await response.json();
  const data = dataOne.slice(0, 2);
  const student = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/students/all`);
  const students = await student.json();
  const teacher = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/all/teacher`);
  const teacherList = await teacher.json();
  const post = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/post/all`);
  const postsOne = await post.json();
  const posts = postsOne.slice(0, 2);

  return {
    props: {
      data,
      teacherList,
      posts,
      students,
    },
  };
}

const admin = ({ data, teacherList, posts, students }) => {
  console.log(data, teacherList, posts);
  let render = 3;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 leading-tight p-4">
        {" "}
        Teachers{" "}
      </h1>
      <div className="flex justify-between">
        {teacherList.map((teacher) => {
          if (teacherList.indexOf(teacher) === render) return;
          return (
            <Link
              href={`/admin/teachers/${teacher.teacher_id}`}
              key={teacher.teacher_id}
            >
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
                    <p className="font-semibold text-gray-600 text-s">
                      {" "}
                      Teacher{" "}
                    </p>
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
                  <Link
                    href={`/admin/teachers/${teacher.teacher_id}`}
                    key={teacher.teacher_id}
                  >
                    <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                      Check profile
                      <i className="bx bx-user-plus ml-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end p-8">
        <Link href={`/admin/teachers`}>
          <h1 className="text-l font-serif font-medium p-2">See more</h1>
        </Link>
        <HiArrowCircleRight size={40}></HiArrowCircleRight>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 leading-tight p-4">
        {" "}
        Students{" "}
      </h1>
      <div className="flex justify-between">
        {students.map((student) => {
          if (students.indexOf(student) === render) return;
          return (
            <Link
              href={`/admin/students/${student.student_id}`}
              key={student.student_id}
            >
              <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm text-center">
                <div className="p-4 border-t border-b md:border md:rounded text-center">
                  <div className="text-center">
                    <Image
                      className="h-14 w-10 rounded-full mr-2 object-cover"
                      src={student.image}
                      width={160}
                      height={140}
                      alt={""}
                    />
                  </div>
                  <div className="text-center ">
                    <p className="font-semibold text-gray-700 text-m">
                      {" "}
                      {student.userName}{" "}
                    </p>
                    <p className="font-semibold text-gray-600 text-s">
                      {" "}
                      Student{" "}
                    </p>
                  </div>
                  <Link
                    href={`/admin/students/${student.student_id}`}
                    key={student.student_id}
                  >
                    <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                      Check profile
                      <i className="bx bx-user-plus ml-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end p-8">
        <Link href={`/admin/students`}>
          <h1 className="text-l font-serif font-medium p-2">See more</h1>
        </Link>
        <HiArrowCircleRight size={40}></HiArrowCircleRight>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 leading-tight p-4">
        {" "}
        Free courses{" "}
      </h1>
      <div className="flex justify-around p-4">
        {teacherList.map((teacher) => {
          return data.map((course) => {
            if (course.teacher === teacher.teacher_id) {
              if (data.indexOf(course) === render) {
                console.log("heheheheheheheh");
              } else {
                return (
                  <Link
                    href={`/admin/freeCourses/${course.freeCourse_id}`}
                    key={course.freeCourse_id}
                  >
                    <Card
                      style={{ width: "300px", height: "400px" }}
                      className="text-center "
                    >
                      <Image
                        src={course.image}
                        width={300}
                        height={250}
                        className="text-center"
                        alt={""}
                      />
                      <div className="p-2 text-center  text-xl font-serif font-medium">
                        Title: {course.title}
                      </div>
                      <div className="p-2 text-center  text-xl font-serif font-medium">
                        Teacher: {teacher.userName}
                      </div>
                      <div style={{ color: "#000000" }}>
                        <h1 className="text-center  text-l font-serif font-medium">
                          Category: {course.category}
                        </h1>
                        <h1
                          style={{ color: "#000000" }}
                          className="text-center  text-l font-serif font-medium "
                        >
                          Status: {course.Status}
                        </h1>
                      </div>
                    </Card>
                  </Link>
                );
              }
            }
          });
        })}
      </div>

      <div className="flex justify-end p-8">
        <Link href={`/admin/freeCourses`}>
          <h1 className="text-l font-serif font-medium p-2">See more</h1>
        </Link>
        <HiArrowCircleRight size={40}></HiArrowCircleRight>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 leading-tight p-4">
        {" "}
        Posts{" "}
      </h1>
      <div className="flex justify-around p-4">
        {teacherList.map((teacher) => {
          return posts.map((course) => {
            if (course.author_id === teacher.teacher_id) {
              if (posts.indexOf(course) === render) return;
              else {
                return (
                  <Link
                    href={`/admin/posts/${course.post_id}`}
                    key={course.post_id}
                  >
                    <Card
                      style={{ width: "350px", height: "400px" }}
                      className="text-center "
                    >
                      <Image
                        src={course.Image}
                        width={300}
                        height={250}
                        className="text-center"
                        alt={""}
                      />
                      <div className="p-2 text-center  text-xl font-serif font-medium">
                        Title: {course.title}
                      </div>
                      <div className="p-2 text-center  text-xl font-serif font-medium">
                        teacher: {teacher.userName}
                      </div>
                      <div style={{ color: "#3881AB" }}>
                        <h1
                          style={{ color: "#000000" }}
                          className="text-center  text-l font-serif font-medium "
                        >
                          Status: {course.status}
                        </h1>
                      </div>
                    </Card>
                  </Link>
                );
              }
            }
          });
        })}
      </div>

      <div className="flex justify-end p-8">
        <Link href={`/admin/posts`}>
          <h1 className="text-l font-serif font-medium p-2">See more</h1>
        </Link>
        <HiArrowCircleRight size={40}></HiArrowCircleRight>
      </div>
    </div>
  );
};

export default admin;
