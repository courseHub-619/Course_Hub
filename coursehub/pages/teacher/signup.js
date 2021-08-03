import SignIn from "../../components/teachersAuth/SignIn.jsx";

function signup() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHRlYWNoZXJ8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <SignIn />
    </div>
  );
}

export default signup;
