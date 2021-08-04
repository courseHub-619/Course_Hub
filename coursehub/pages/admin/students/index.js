import Card from '@material-ui/core/Card';
import Image from 'next/image';
import Link from "next/link";
import { HiArrowCircleRight } from "react-icons/hi";
import ReactStars from "react-rating-stars-component";

export async function getStaticProps() {

    const student = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/students/all`
    )
    const students = await student.json()

    return {
        props: {

            students

        },
    }
}

const students = ({ students }) => {
    return (
        <div className="flex justify-between">
            {students.map(student => {
                return <Link href={`/admin/students/${student.student_id}`} key={student.student_id}>
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
                                <p className="font-semibold text-gray-600 text-s"> student </p>

                            </div>
                            <Link href={`/admin/students/${student.student_id}`} key={student.student_id}><button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                                Check profile
                                <i className="bx bx-user-plus ml-2"></i>
                            </button></Link>
                        </div>
                    </div>
                </Link>
            })
            }
        </div>
    );
}

export default students;