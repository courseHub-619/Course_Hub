function Auth() {




    return (
        <div>





<figure className="h-screen flex bg-gray-100">
    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
      <blockquote className="text-2xl font-medium text-center">
  
      </blockquote>
      
      <div className="text-primary m-6">
    <div className="flex items-center mt-3 justify-center">
      <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
        
Continue as :      </h1>
    </div>
    <form>



      
      <div className="flex items-center mt-3 justify-center">
      <form action="http://localhost:3000/teacher/login">
        <button
          className={
            "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
          }
          value="Login"
    
        >
          teacher
        </button>
        </form>
        <form action="http://localhost:3000/student/login">
        <button
          className={
            "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
          }
          value="Login"
    
        >
          student
        </button>
        </form>
      </div>
    </form>
    <div className="flex items-center mt-3 justify-center">
    <form action="http://localhost:3000/student/login">
   
    </form>
    </div>
  </div>
      
    </div>
  </figure>

        </div>
    )
}


export default Auth;