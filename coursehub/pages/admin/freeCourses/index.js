import Card from "@material-ui/core/Card";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/admin/freeCourse/all`
  );
  const data = await response.json();
  const teacher = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}admin/all/teacher`
  );
  const teacherList = await teacher.json();
  return {
    props: {
      data,
      teacherList,
    },
  };
}

const freeCourse = ({ data, teacherList }) => {
  console.log(data, "dataaaaaa");
  return (
    <div className="grid grid-cols-3 gap-4 text-center p-6">
      {teacherList.map((teacher) => {
        return data.map((course) => {
          if (course.teacher === teacher.teacher_id) {
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
                      Ctaegory: {course.category}
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
        });
      })}
    </div>
  );
};

export default freeCourse;
