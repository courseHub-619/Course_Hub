import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"

const NotFound = () => {
    const router = useRouter()
    useEffect(() => {
        console.log("test")
        setTimeout(() => {
            router.push("/")
        }, 3000)
    }, [])
    return (
        <div className="text-center p-20">
            <p>Oooops...</p>
            <p>This page cannot be found.</p>
            <p>Go back to the <Link href="https://stackoverflow.com/"><a className="font-bold">Homepage</a></Link></p>
        </div>
    );
}

export default NotFound;