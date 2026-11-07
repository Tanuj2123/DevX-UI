import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import Card from "./Card";

const Connections= ()=>{
    const [connections,setConnecitions] = useState([]);
    const fetchUserConnections = async ()=>{
        const res = await axios.get(BACKEND_URL+"/user/connections",{withCredentials:true});
        setConnecitions(res.data?.data);
    }

    useEffect(()=>{
        fetchUserConnections()
    },[])
    return (
        <div>
            {connections.map((connection)=> <Card key={connection?._id}data={connection} b1={null} b2={null}/>)}
        </div>
    )
}

export default Connections;