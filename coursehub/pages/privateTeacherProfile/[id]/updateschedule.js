import axios from "axios";
import React, { useEffect, useState } from "react";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/admin/teacher/all");
  const data = await response.json();
  const paths = data.map((teacher) => {
    let id = teacher.teacher_id;
    // console.log("id", id)
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const teacherId = context.params.id;
  const teacher = await fetch(
    `http://localhost:4200/admin/teacher/one/${teacherId}`
  );
  const TeacherProfile = await teacher.json();

  return {
    props: {
      teacherId: teacherId,
    },
  };
};

const updateSchedule = ({ teacherId }) => {
  let [days, setDays] = useState([]);
  let [monday, setMonday] = useState(false);
  let [tuesday, setTuesday] = useState(false);
  let [wednesday, setWednesday] = useState(false);
  let [thursday, setThursday] = useState(false);
  let [friday, setFriday] = useState(false);
  let [saturday, setSaturday] = useState(false);
  let [sunday, setSunday] = useState(false);
  let [one, setOne] = useState(false);
  let [two, setTwo] = useState(false);
  let [three, setThree] = useState(false);
  let [four, setFour] = useState(false);
  let [five, setFive] = useState(false);
  let [six, setSix] = useState(false);

  console.log(teacherId);

  let change = (e) => {
    // setDays([...days, e.target.value]);
    console.log(e.target.value);
  };

  let changeSchedule = () => {
    let updateDays = axios
      .post(`http://localhost:4200/teacher/days/${teacherId}`, {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    let updateSessions = axios
      .post(`http://localhost:4200/teacher/sessions/${teacherId}`, {
        one,
        two,
        three,
        four,
        five,
        six,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-200  grid justify-items-center p-12">
      <div className=" bg-white  flex justify-center content-center rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
        <div className="flex flex-col p-8">
          <label className="inline-flex items-center mt-3">
            <input
              value="monday"
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={() => setMonday(!monday)}
            />
            <span className="ml-2 text-gray-700">Monday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-600"
              onChange={() => setTuesday(!tuesday)}
            />
            <span className="ml-2 text-gray-700">Tuesday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-orange-600"
              onChange={() => setWednesday(!wednesday)}
            />
            <span className="ml-2 text-gray-700">Wednesday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-yellow-600"
              onChange={() => setThursday(!thursday)}
            />
            <span className="ml-2 text-gray-700">Thursday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-600"
              onChange={() => setFriday(!friday)}
            />
            <span className="ml-2 text-gray-700">Friday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-teal-600"
              onChange={() => setSaturday(!saturday)}
            />
            <span className="ml-2 text-gray-700">Saturday</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onChange={() => setSunday(!sunday)}
            />
            <span className="ml-2 text-gray-700">Sunday</span>
          </label>
        </div>
        <div className="flex flex-col p-8">
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={() => setOne(!one)}
            />
            <span className="ml-2 text-gray-700">10:00 - 12:00</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-600"
              onChange={() => setTwo(!two)}
            />
            <span className="ml-2 text-gray-700">12:00 - 14:00</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-orange-600"
              onChange={() => setThree(!three)}
            />
            <span className="ml-2 text-gray-700">14:00 - 16:00</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-yellow-600"
              onChange={() => setFour(!four)}
            />
            <span className="ml-2 text-gray-700">16:00 - 18:00</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-600"
              onChange={() => setFive(!five)}
            />
            <span className="ml-2 text-gray-700">18:00 - 20:00</span>
          </label>

          <label className="inline-flex  items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-teal-600"
              onChange={() => setSix(!six)}
            />
            <span className="ml-2 text-gray-700">20:00 - 22:00</span>
          </label>
        </div>
      </div>
      <button
        className=" bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
        onClick={changeSchedule}
      >
        confirm
      </button>
    </div>
  );
};

export default updateSchedule;
