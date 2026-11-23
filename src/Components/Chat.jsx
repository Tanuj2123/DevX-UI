import { useParams } from "react-router";
import { BACKEND_URL, USER_DEFAULT_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";


const Chat = () => {

    const {toUserId} = useParams();
    const user = useSelector((state)=>state.user?.user);
    const userId = user?._id;
    const [toUser,setToUser] = useState({});
    const [pastMessages,setPastMessages] = useState([]);
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const getUser = async()=>{
        const data  = await axios.get(BACKEND_URL+"/profile/getData/"+toUserId,{withCredentials:true});
        setToUser(data.data.user);
    }

    const getPastChats  = async()=>{
        const chatId = userId+"_"+toUserId;
        const data = await axios.get(BACKEND_URL+"/chat/"+chatId,{withCredentials:true});

        const pastMessages = data?.data?.chat?.messages;
        console.log(pastMessages);
        
        
        setPastMessages(pastMessages);
    }

    const handleSend = ()=>{
        const socket = createSocketConnection();
        socket.emit("sendMessage",{senderName:user.name,userId,toUserId,message});
        setMessages((messages)=>[...messages,user.name+": "+message]);
        setMessage("");
    }

    const handleMessageChange = (e)=>{
        setMessage(e.target.value);
    }

    useEffect(()=>{
        getUser();
    },[toUserId]);

    useEffect(()=>{
        if(user)
         getPastChats();
    },[userId,toUserId]);
    
    useEffect(()=>{
        if(!toUserId){
           return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat",{userId,toUserId})

        socket.on("messageRecieved",({senderName,id,message})=>{
           message = senderName + ": "+ message
           if(userId!==id) setMessages((messages)=>[...messages,message]);
        })

        socket.on("messageError", ({ message }) => {
             console.error(message);
        });

       return ()=>{
            socket.disconnect();
        }
    },[user,toUserId,toUser]);
  return (
    <div className="flex flex-col items-center w-100 mx-auto bg-base-200 rounded-lg my-10">
        <div className="flex justify-start w-full items-center p-2">
            <img
                src={toUser?toUser?.photoUrl:USER_DEFAULT_URL}
                alt="profile-pic"
                className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <p className="mx-2">{toUser?.name}</p>
        </div>
        <div className="h-[60vh] overflow-y-auto hide-scrollbar flex flex-col justify-start w-full p-4">
            {pastMessages.map((message,index)=><p key={index}>{message?.senderId?.name+": "+message.message}</p>)}
            {messages.map((message,index)=> <p key={index}>{message}</p>)}
        </div>
        <div className="flex w-full px-4 mb-4">
            <input value={message} onChange={(e)=>handleMessageChange(e)} type="text" className="bg-gray-300 w-3/4 p-2 rounded-lg text-black"></input>
            <button className="btn btn-secondary w-1/4 p-2 ml-3 rounded-xl" onClick={handleSend} >Send</button>
        </div>
    </div>
  );
};

export default Chat;
