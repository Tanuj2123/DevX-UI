import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { addUser } from "../store/user.slice";
import { BACKEND_URL } from "../utils/constants";


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const user = useSelector(state=>state.user.user);

  if(user){
    return navigate("/");
  }

  const handleLogin = async (e)=>{
    e.preventDefault();

    try {
      const res = await axios.post(BACKEND_URL+"/auth/login",{
        email:emailId,password
      },{withCredentials:true})

      if(res.data?.success === true){
        dispatch(addUser(res.data?.user));
        navigate("/");
      }
    } catch (error) {
       console.error(error);
       setErrorMessage(error.response.data?.message);
    }

  }


  return (
      <div className="flex justify-center">
        <form className="flex flex-col items-center justify-center w-60 h-full mt-36 bg-base-300 p-10  m-2 rounded-lg">
        <h1 className="text-center text-3xl mb-6">DevX</h1>
        <input className="m-2 p-2 border border-black rounded-lg" type="email" placeholder="Email..." value={emailId} onChange={(e)=>setEmailId(e.target.value)}></input>
        <input className="m-2 p-2 border border-black rounded-lg" type="password" placeholder="Password..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <p className="text-red-600">{errorMessage}</p>
        <p>New? <Link to="/signup" className="text-left text-blue-700">SignUp Now</Link></p>
        <button className="px-4 py-2 mt-6 rounded-lg w-44 text-taupe-950 bg-slate-200 hover:bg-slate-50" type="submit" onClick={(e)=>handleLogin(e)}>Log In</button>
      </form>
      </div>
  )
}

export default Login