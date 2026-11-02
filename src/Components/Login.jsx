import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";


const Login = () => {

  const navigate = useNavigate();
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  console.log(errorMessage);

  const handleLogin = async (e)=>{
    e.preventDefault();

    const data = {
      email:emailId,
      password:password
    }

    try {
      const res = await axios.post("http://localhost:6969/auth/login",{
        email:emailId,password
      })

      console.log(res);

      if(res.data?.success === true){
        console.log(true);
        navigate("/");
      }
    } catch (error) {
       console.log(error);
       setErrorMessage(error.errorMessage);
    }

  }


  return (
      <div className="flex justify-center">
        <form className="flex flex-col items-center justify-center w-60 h-full mt-36 bg-base-300 p-10  m-2 rounded-lg">
        <h1 className="text-center text-3xl mb-6">DevX</h1>
        <input className="m-2 p-2 border border-black rounded-lg" type="email" placeholder="Email..." value={emailId} onChange={(e)=>setEmailId(e.target.value)}></input>
        <input className="m-2 p-2 border border-black rounded-lg" type="password" placeholder="Password..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <p>{errorMessage}</p>
        <button className="px-4 py-2 mt-6 rounded-lg w-44 text-taupe-950 bg-slate-200 hover:bg-slate-50" type="submit" onClick={(e)=>handleLogin(e)}>Log In</button>
      </form>
      </div>
  )
}

export default Login