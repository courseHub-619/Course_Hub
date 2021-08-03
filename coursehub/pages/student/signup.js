import SignIn from "../../components/studentsAuth/SignIn.jsx";

function signup() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1513258496099-48168024aec0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudCUyMGFuZCUyMHRlYWNoZXJzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <SignIn />
    </div>
  );
}

export default signup;
