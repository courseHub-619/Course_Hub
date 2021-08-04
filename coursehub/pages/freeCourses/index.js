import Card from "@material-ui/core/Card";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/freecourse/all`);
  const data = await response.json();
  const teacher = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/freecourse/all/teacher`);
  const teacherList = await teacher.json();
  return {
    props: {
      data,
      teacherList,
    },
  };
}

const free = (props) => {
  console.log("here", props);
  return (
    <div
      className="p-6 gap-2"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1593600269510-0816682e80da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGVhcm58ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center" style={{ color: "#3881AB" }}>
        <p className="py-8 text-center text-3xl font-serif font-medium">
          Free Courses{" "}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {props.teacherList.map((teacher) => {
          return props.data.map((course) => {
            if (course.teacher === teacher.teacher_id) {
              return (
                <Link
                  href={`/freeCourses/${course.freeCourse_id}`}
                  key={course.freeCourse_id}
                >
                  <Card
                    style={{ width: "300px", height: "370px" }}
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
                      {course.title}
                    </div>
                    <div style={{ color: "#3881AB" }}>
                      <button className="text-center  text-l font-serif font-medium">
                        {course.category}
                      </button>
                    </div>
                  </Card>
                </Link>
              );
            }
          });
        })}
      </div>
    </div>
  );
};

export default free;
