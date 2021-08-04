import Card from '@material-ui/core/Card';
import Image from 'next/image';
import Link from "next/link";
import { HiArrowCircleRight } from "react-icons/hi";
import ReactStars from "react-rating-stars-component";

export async function getStaticProps() {

    const teacher = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/all/teacher`
    )
    const teacherList = await teacher.json()

    return {
        props: {

            teacherList,

        },
    }
}

const teachers = ({ teacherList }) => {
    return (
        <div className="flex justify-between">
            {teacherList.map(teacher => {
                return <Link href={`/admin/teachers/${teacher.teacher_id}`} key={teacher.teacher_id}>
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
                            <Link href={`/admin/teachers/${teacher.teacher_id}`} key={teacher.teacher_id}><button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
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

export default teachers;