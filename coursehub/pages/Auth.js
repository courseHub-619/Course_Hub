import Link from "next/link";

function Auth() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHN0dWRlbnQlMjBhbmQlMjB0ZWFjaGVyc3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen flex bg-opacity-25 bg-gray-100">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
          <blockquote className="text-2xl font-medium text-center"></blockquote>

          <div className="text-primary m-6">
            <div className="flex items-center mt-3 justify-center">
              <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                Continue as :{" "}
              </h1>
            </div>
            <form>
              <div className="flex items-center mt-3 justify-center">
                <form>
                  <Link href={"/teacher/login"}>
                    <button
                      className={
                        "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                      }
                      value="Login"
                    >
                      teacher
                    </button>
                  </Link>
                </form>
                <form>
                  <Link href={"/student/login"}>
                    <button
                      className={
                        "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                      }
                      value="Login"
                    >
                      student
                    </button>
                  </Link>
                </form>
              </div>
            </form>
            <div className="flex items-center mt-3 justify-center">
              <form action="http://localhost:3000/student/login"></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
