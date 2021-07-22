import { RiMailSendFill } from "react-icons/ri";
import Image from "next/image";
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import Link from "next/link"

const Footer = () => {
    return (


        <footer className="flex justify-between bg-gray-100  ">

            <div>
                <div className="flex">
                    <Image className="text-center" src="/logo.png" width={80} height={50} alt={""} />
                    <div style={{ "color": "#3881AB" }} className="p-4">
                        <h5 className=" text-xl font-serif font-medium"> <Link href="/"><a>CourseHub</a></Link></h5>
                    </div>
                </div>
                <div style={{ "color": "#3881AB" }} className="flex justify-between text-l font-serif font-medium ">
                    <div className="p-4">
                        <ul >
                            <li className="p-1"><a href="">Courses</a></li>
                            <li className="p-1"><a href="">Partners</a></li>
                            <li className="p-1"><a href="">Team</a></li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <ul >
                            <li className="p-1"><a href="">Support</a></li>
                            <li className="p-1"> <Link href="/about"><a>About</a></Link></li>
                        </ul>
                    </div>
                    <div className="p-4">

                    </div>
                </div>

            </div>
            <div style={{ "color": "#3881AB" }} className="p-4">
                <h5 className=" text-xl font-serif font-medium p-8">Contact Us</h5>
                <ul className="flex justify-between gap-2">
                    <AiFillFacebook size={30} />
                    <AiFillTwitterCircle size={30} />
                    <AiFillGithub size={30} />
                    <AiFillInstagram size={30} />
                </ul>
                <h1 className="text-center text-l font-serif font-normal py-8">© Copyright 2021</h1>
            </div>
            <div className="p-4">
                <form>
                    <h5 className=" text-xl font-serif font-medium p-4" style={{ "color": "#3881AB" }}>Send us an E-mail</h5>
                    <fieldset className="p-2">
                        <input className="w-60 bg-transparent" type="email" placeholder="Enter email" />
                    </fieldset>
                    <fieldset className="p-2 font-medium">
                        <textarea className="w-60 bg-transparent" placeholder="Message"></textarea>
                    </fieldset>
                    <fieldset style={{ "color": "#3881AB" }} className="p-2 justify-end">
                        <RiMailSendFill size={30} />
                    </fieldset>
                </form>
            </div>

        </footer>
    );
}

export default Footer;