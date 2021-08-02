import LoginForm from "../../components/teachersAuth/LoginForm.jsx";


function login (){

    return(
        <div
        style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1580894732930-0babd100d356?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVhY2hlcnxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          >
            <LoginForm/>
        </div>
    )
}
export default login
