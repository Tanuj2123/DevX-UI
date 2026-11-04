import { Outlet, useNavigate } from "react-router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BACKEND_URL } from "../utils/constants"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user.slice";
import { useEffect } from "react";


const Body = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user.user);

  const fetchUser = async ()=>{

    try {
       const res = await axios.get(BACKEND_URL+"/profile",{withCredentials:true});
       dispatch(addUser(res.data?.user));
    } catch (error) {
      if(!error.response?.data?.success){
        navigate("/login");
      }
      else{
        console.error(error);
      }
    }
  }

  useEffect(()=>{
    if(!user){
      console.log("called");
      fetchUser();
    }
  },[]);

  return (
    <div className="">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body