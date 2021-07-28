import { useState } from "react"

const MyCalendar = () => {
    const [One, setOne] = useState(false)
    const [styleOne, setStyleOne] = useState("flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100")

    const [Two, setTwo] = useState(false)
    const [styleTwo, setStyleTwo] = useState("flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100")

    const [Three, setThree] = useState(false)
    const [styleThree, setStyleThree] = useState("flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100")

    const [Four, setFour] = useState(false)
    const [styleFour, setStyleFour] = useState("flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100")

    const [Five, setFive] = useState(false)
    const [styleFive, setStyleFive] = useState("flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-yellow-500 hover:text-gray-100")

    const [Six, setSix] = useState(false)
    const [styleSix, setStyleSix] = useState("flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-indigo-500 hover:text-gray-100")



    const handleDay = (set, status, setStyle, style) => {
        if (status === false) {
            set(true)
            setStyle("flex items-center p-4 bg-green-500 rounded-lg shadow-xs cursor-pointer  hover:text-gray-100");
        }
        else if (status === true) {
            set(false)
            setStyle(style)
        }

    }

    console.log(One)
    console.log(Two)
    return (

        <section className="container mx-auto px-6 my-1 flex flex-wrap -m-4">
            <div className="p-2 md:w-40 ">
                <p href="#" className={styleOne}>

                    <svg className="h-6 fill-current hover:text-gray-100 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div>
                        <button onClick={() => handleDay(setOne, One, setStyleOne, "flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100")} className=" text-xs font-medium ml-2 ">
                            Session one: 8-10 AM
                        </button>

                    </div>
                </p>
            </div>

            <div className="p-2 md:w-40 ">
                <div className={styleTwo}>

                    <svg className="h-6 fill-current hover:text-gray-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div>
                        <button onClick={() => handleDay(setTwo, Two, setStyleTwo, "flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100")} className="text-xs font-medium ml-2 ">
                            Session two: 10-12 AM
                        </button>

                    </div>
                </div>
            </div>
            <div className="p-2 md:w-40 ">
                <div className={styleThree}>

                    <svg className="h-6 fill-current hover:text-gray-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div>
                        <button onClick={() => handleDay(setThree, Three, setStyleThree, "flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100")} className=" text-xs font-medium ml-2 ">
                            Session three: 2-4 PM
                        </button>

                    </div>
                </div>
            </div>

            <div className="p-2 md:w-40 ">
                <div className={styleFour}>

                    <svg className="h-6 fill-current hover:text-gray-100" role="img" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div>
                        <button onClick={() => handleDay(setFour, Four, setStyleFour, "flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100")} className=" text-xs font-medium ml-2 ">
                            Session four: 4-6 PM
                        </button>

                    </div>
                </div>
            </div>
            <div className="p-2 md:w-40 ">
                <div className={styleFive}>

                    <svg className="h-6 fill-current hover:text-gray-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>                    <div>
                        <button onClick={() => handleDay(setFive, Five, setStyleFive, "flex items-center p-4 bg-yellow-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100")} className=" text-xs font-medium text-uppercase ml-2 ">
                            Session five: 6-8 PM
                        </button>

                    </div>
                </div>
            </div>
            <div className="p-2 md:w-40 ">
                <div className={styleSix}>

                    <svg className="h-6 fill-current hover:text-gray-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>                    <div>
                        <button onClick={() => handleDay(setSix, Six, setStyleSix, "flex items-center p-4 bg-indigo-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100")} className=" text-xs font-medium ml-2 ">
                            Session six: 8-10 PM
                        </button>

                    </div>
                </div>
            </div>



        </section>)
}

export default MyCalendar;