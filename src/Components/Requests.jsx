import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { addRequestData } from "../store/requests.slice";

const Requests = ()=>{
    const dispatch = useDispatch();
    const requests = useSelector((state)=>state.requests.data);

    const fetchPendingRequests = async ()=>{
        const res = await axios.get(BACKEND_URL+"/user/requests/pending",{withCredentials:true});
        dispatch(addRequestData(res?.data?.pendingConnections));
    }
    useEffect(()=>{
        fetchPendingRequests();
    },[]);

    return(
        <div>
           {requests.map((request)=> <Card key={request._id} data={request?.fromUserId} b1="Reject" b2="Accept" id={request._id}/>)}
        </div>
    )
}

export default Requests;