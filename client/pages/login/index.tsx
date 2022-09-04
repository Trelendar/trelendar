import React from "react";
import Nav from "../../components/Nav";

const User: React.FC = () => {
    return (
      <div className="flex justify-center my-8">
        <div className="w-96 justify-center border boder-cyan-50 shadow-md p-6">
          <h1 className="text-green-700 text-xl font-medium mb-4 text-center">
            Login to Trelendar
          </h1>
          <input type="text" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required/>
          <input type="text" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required/>
          <button className="bg-green-500 mb-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
            Login
          </button>
          <div className="text-center mb-4">
            OR
          </div>
          <button className="bg-white w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Button
          </button>
        </div>
      </div>
    )
}

export default User;