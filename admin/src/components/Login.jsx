import React, { useState } from "react";
import Navbar from "./Navbar";
import { backendUrl } from "../App";
import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReacToastify.css'

const Login = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler = async (e) => {
    try {
        e.preventDefault()
        const response = await axios.post(backendUrl + 'api/user/admin',{email,password})
        console.log(response.data)
        if(response.data.success){
            setToken(response.data.token)
        }else{

        }
    } catch (error) {
        
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <p className="text-center p-8 pb-0 text-[5.5rem] text-zinc-400 " > Admin Panel</p>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90% sm:max-w-96 m-auto mt-14 gap-4 text-gray-800]"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5] w-8 bg-gray-800" />
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create Account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer"
              >
                Login here!
              </p>
            )}
          </div>
          <button className="bg-black text-white font-light px-8 py-2 mt-4">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
