import Card from '@material-ui/core/Card';
import Image from 'next/image';
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import { HiArrowCircleRight } from "react-icons/hi";
import ReactStars from "react-rating-stars-component";


export async function getStaticProps() {

    const teacher = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/all/teacher`
    )
    const teacherList = await teacher.json()
    const post = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/post/all`
    )
    const posts = await post.json()
    return {
        props: {
            teacherList,
            posts
        },
    }
}

const posts = ({ teacherList, posts }) => {
    return (
        <div className="grid grid-cols-3 gap-4 text-center p-6">
            {
                teacherList.map(teacher => {
                    return posts.map((course) => {
                        if (course.author_id === teacher.teacher_id) {

                            return <Link href={`/admin/posts/${course.post_id}`} key={course.post_id}>
                                <Card style={{ "width": "350px", "height": "400px" }} className="text-center ">
                                    <Image src={course.Image} width={300} height={250} className="text-center" alt={""} />
                                    <div className="p-2 text-center  text-xl font-serif font-medium">{course.title}</div>
                                    <div className="p-2 text-center  text-xl font-serif font-medium">{teacher.userName}</div>
                                    <div style={{ "color": "#3881AB" }}>
                                        <h1 style={{ "color": "#000000" }} className="text-center  text-l font-serif font-medium " >{course.status}</h1>
                                    </div>

                                </Card>
                            </Link>
                        }
                    })
                })
            }

        </div>
    );
}

export default posts;