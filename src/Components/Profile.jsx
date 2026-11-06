import { useState } from "react"
import { useSelector } from "react-redux"
import EditProfile from "./EditProfile";
import Card from "./Card";

const Profile = () => {

  const user = useSelector((state)=>state.user.user);

  if(!user) return;
  
  return (    
    <EditProfile user={user}/>
  )
}

export default Profile