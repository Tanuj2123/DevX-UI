import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/feed.slice";


const Feed = ()=>{
    const feed = useSelector((state)=>state.feed.data);
    const dispatch = useDispatch();

    const fetchFeedData = async()=>{
        const data = await axios.get(BACKEND_URL+"/user/feed",{withCredentials:true})
        dispatch(addData(data?.data?.feed));
    }

    useEffect(()=>{
        fetchFeedData();
    },[])

    
    return (
        <div className="flex items-center justify-center flex-wrap">
            {feed && feed.map((item)=><Card key={item._id} id={item._id} data={item} b1="Ignore" b2="Send"/>)}
        </div>
    )
}

export default Feed;