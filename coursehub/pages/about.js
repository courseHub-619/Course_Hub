import Image from 'next/image'

const About = () => {
    return (

        <div className="flex justify-between p-10" style={{ "color": "#3881AB" }}>
            <div className=" p-6 text-l text-left font-serif font-medium ">
                <p> CourseHub is a Web-based solution for distance learnning and education.
                    It offers to students the help needed to overcome challenges related to their studies.
                    The unique resources available for those enrolled in internet-based programs will change the
                    Web-based educational experience by tailoring  their personal strengths, needs, and learning styles.
                </p>
                <p className=" p-4 text-center text-l font-serif font-medium ">  “An investment in knowledge pays the best interest.” Benjamin Franklin</p>
            </div>
            <div className="p-4">
                <Image src="/home9.jpeg" width={1500} height={850} alt={""} />
            </div>
        </div>
    );
}

export default About;
