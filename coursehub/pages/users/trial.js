// import React, { useState } from "react";
// import DatePicker from "react-datepicker";

<<<<<<< HEAD
// import "react-datepicker/dist/react-datepicker.css";

// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// const Example = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
//       <div className="py-3 sm:max-w-xl sm:mx-auto">
//         <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
//           <div className="px-12 py-5">
//             <h2 className="text-gray-800 text-3xl font-semibold">
//               Your opinion matters to us!
//             </h2>
//           </div>
//           <div className="bg-gray-200 w-full flex flex-col items-center p-8">
//             <DatePicker
//               className="p-4 text-gray-500 rounded-xl resize-none "
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//             />
//             <div className="p-4">
//               <div className="mt-2 p-3 w-30 bg-white rounded-lg shadow-xl">
//                 <div className="flex h-30">
//                   <select
//                     name="hours"
//                     className="bg-transparent text-xl appearance-none outline-none"
//                   ></select>
//                   <span className="text-xl mr-3">:</span>
//                   <select
//                     name="minutes"
//                     className="bg-transparent text-xl appearance-none outline-none mr-4"
//                   >
//                     <option value="0">00</option>
//                     <option value="30">30</option>
//                   </select>
//                   <select
//                     name="ampm"
//                     className="bg-transparent text-xl appearance-none outline-none"
//                   >
//                     <option value="am">AM</option>
//                     <option value="pm">PM</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="w-3/4 flex flex-col">
//               <input
//                 rows="3"
//                 className="p-4 text-gray-500 rounded-xl resize-none"
//                 placeholder="Leave a message, if you want"
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <button
//                 // onClick={sendFeedback}
//                 className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
//               >
//                 schedule
//               </button>
//             </div>
//           </div>
//           <div className="h-20 flex items-center justify-center">
//             <a href="#" className="text-gray-600">
//               Maybe later
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Example;
=======
const Details = (props) => {
  return (
    <div>test</div>
  );
};

export default Details;



// <>
//   <div className="flex min-h-screen bg-white">
//     {/* <div className="w-1/2 bg-cover md:block hidden" style="background-image:  url(https://images.unsplash.com/photo-1520243947988-b7b79f7873e9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fGJsYWNrJTIwZm9yZXN0fGVufDB8fDB8eWVsbG93&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)"></div> */}
//     <div className="bg-no-repeat bg-right bg-cover max-w-max max-h-8 h-12 overflow-hidden"></div>{" "}
//     <Image
//       height={500}
//       width={700}
//       // layout="fill"
//       src="https://images.unsplash.com/photo-1520243947988-b7b79f7873e9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fGJsYWNrJTIwZm9yZXN0fGVufDB8fDB8eWVsbG93&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)"
//       alt="hey"
//     />
//     <div className="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
//       <div className="text-left p-0 font-sans">
//         <h1 className=" text-gray-800 text-3xl font-medium">
//           Create an account for free
//         </h1>
//         <h3 className="p-1 text-gray-700">
//           Free forever. No payment needed.
//         </h3>
//       </div>
//       <form action="#" className="p-0">
//         <div className="mt-5">
//           <label className="sc-bqyKva ePvcBv">
//             Email
//           </label>
//           <input
//             type="text"
//             className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
//             placeholder="Email"
//           />
//         </div>
//         <div className="mt-5">
//           <input
//             type="text"
//             className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
//             placeholder="User-name"
//           />
//         </div>
//         <div className="mt-5">
//           <input
//             type="password"
//             className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
//             placeholder="Password"
//           />
//         </div>

//         <div className="mt-6 block p-5 text-sm md:font-sans  text-gray-800">
//           <input type="checkbox" className="inline-block border-0  " />
//           <span display="inline" className="">
//             By creating an account you are agreeing to our
//             <a
//               className=""
//               href="/s/terms"
//               target="_blank"
//               data-test="Link"
//             >
//               <span className="underline ">Terms and Conditions</span>{" "}
//             </a>{" "}
//             and
//             <a
//               className=""
//               href="/s/privacy"
//               target="_blank"
//               data-test="Link"
//             >
//               <span className="underline">Privacy Policy</span>{" "}
//             </a>
//           </span>
//         </div>

//         <div className="mt-10">
//           <input
//             type="submit"
//             value="Sign up with email"
//             className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
//           />
//         </div>
//       </form>
//       <a className="" href="/login" data-test="Link">
//         <span className="block  p-5 text-center text-gray-800  text-xs ">
//           Already have an account?
//         </span>
//       </a>
//     </div>
//   </div>

//   {/* <a href="https://www.buymeacoffee.com/danimai" target="_blank" class="bg-purple-600 p-2 rounded-lg text-white fixed right-0 bottom-0">
//         Support me
//     </a>     */}
// </>
>>>>>>> 5a7cee28d781642fae43c487c36f2d3439cb1b9e
