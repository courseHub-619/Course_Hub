import React, { useState } from "react";
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

const Appointment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, settime] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ]);
  const [selectedTime, setSelectedTime] = useState(0);

  const handleChangeRaw = (value) => {
    if (value === "tomorrow") {
      setStartDate(addDays(new Date(), 1));
    }
  };

  const makeAppointment = () => {
    console.log(startDate);
    swal({
      title: "your lectured has been scheduled!",
      text: `${(startDate, selectedTime)}`,
      icon: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-3xl font-semibold">
              schedule a lecture boy
            </h2>
          </div>
          <div className="bg-gray-200 w-full flex flex-col items-center p-8">
            <DatePicker
              className="p-4 text-gray-500 rounded-xl resize-none shadow-xl "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
            />
            <div className="pb-4 pt-3">
              <div className="mt-2 p-3 w-30 bg-white rounded-lg shadow-xl">
                <div className="flex h-30">
                  <select
                    name="hours"
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-transparent text-xl appearance-none outline-none"
                  >
                    {time.map((hour, index) => {
                      return (
                        <option key={index} value={hour}>
                          {hour}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-xl mr-3">:</span>
                  <p
                    name="minutes"
                    className="bg-transparent text-xl appearance-none outline-none mr-4"
                  >
                    00
                  </p>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <textarea
                className="description p-4 text-gray-500 rounded-xl  shadow-xl  bg-gray-100 sec border border-gray-300 outline-none"
                spellCheck="false"
                placeholder="Describe the topic that you want the teacher to focus on"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={makeAppointment}
                className="shadow-xl py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
              >
                schedule
              </button>
            </div>
          </div>
          <div className="h-20 flex items-center justify-center">
            <a href="#" className="text-gray-600">
              Maybe later
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
