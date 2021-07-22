import React from "react";

export default function LoginForm() {
  return (
    <div>
      <div>
        <h1>login</h1>
        <div>
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
