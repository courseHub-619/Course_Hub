import LoginForm from "../../components/studentsAuth/LoginForm";

function login() {
  return (
    <div
      style={{
        backgroundImage:
          "url( https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZGVudCUyMGFuZCUyMHRlYWNoZXJzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <LoginForm />
    </div>
  );
}
export default login;
