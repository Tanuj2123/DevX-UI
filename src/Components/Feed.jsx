import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import Card from "./Card";


const Feed = ()=>{

    const [feed,setFeed] = useState([]);

    const fetchFeedData = async()=>{
        const data = await axios.get(BACKEND_URL+"/user/feed",{withCredentials:true})
        setFeed(data?.data?.feed);
        console.log(data);
    }

    useEffect(()=>{
        fetchFeedData();
    },[])

    
    return (
        <div className="flex items-center justify-center flex-wrap">
            {feed.map((item)=><Card key={item._id} data={item}/>)}
        </div>
    )
}

export default Feed;