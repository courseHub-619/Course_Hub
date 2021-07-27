// import React, { useState } from "react";
// import DatePicker from "react-datepicker";

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
