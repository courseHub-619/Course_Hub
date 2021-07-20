import axios from "axios";

function test(props) {
  console.log(props);
  return (

    <div>
      {props.data.map((std) => (
        <div key={std.student_id}>
          <div> {std.userName} </div>
          <div> {std.education} </div>
          <div> {std.age} </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await axios.get("http://localhost:4200/test/user");
    const data = res.data;
    return {
      props: { data },
    };
  } catch (error) {
    console.log("here");
    return { error };
  }
}

export default test;
