import axios from "axios";
import { BACKEND_URL, USER_DEFAULT_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateData } from "../store/feed.slice";
import { updateRequestData } from "../store/requests.slice";


const Card = ({data,id,b1,b2})=>{
    const dispatch = useDispatch();

    const handleB1Click =  (e)=>{
        const value = e.target.value;

        if(value.toLowerCase().trim() === "ignore"){
            sendRequest("ignored",id);
        }
        else if(value.toLowerCase().trim() === "reject"){
            reviewRequest("rejected",id);
        }
    }

    const handleB2Click = (e)=>{
        const value = e.target.value;
        if(value.toLowerCase().trim() === "send"){
            sendRequest("interested",id);
        }
        else if(value.toLowerCase().trim() === "accept"){
            reviewRequest("accepted",id);
        }
    }

    const sendRequest = async(status,id)=>{
        const res = await axios.post(`${BACKEND_URL}/request/send/${status}/${id}`,{},{withCredentials:true});
        dispatch(updateData(id))
    }

    const reviewRequest = async(status,id)=>{
        const res = await axios.post(`${BACKEND_URL}/request/review/${status}/${id}`,{},{withCredentials:true});
        dispatch(updateRequestData(id));
    }

    const {photoUrl,name,age,gender} = data;
    if(!name) return;
    return (
        <div className="card card-side w-full max-w-md overflow-hidden rounded-2xl bg-base-300 shadow-lg m-3">
            <figure className="w-36 shrink-0 p-3">
                <img
                className="h-full min-h-48 w-full rounded-xl object-cover"
                src={photoUrl?photoUrl:USER_DEFAULT_URL}
                alt={`${name}'s profile`}
                />
            </figure>

            <div className="card-body justify-between gap-3 p-4">
                <div>
                <h2 className="card-title text-2xl font-bold">{name}</h2>
                <p className="mt-1 text-sm text-base-content/70">
                    {age} years old <span aria-hidden="true">·</span> {gender}
                </p>
                </div>

                <div className="card-actions">
                {b1 && <button type="button" className="btn  btn-sm rounded-full px-5" onClick={(e)=>handleB1Click(e)} value={b1}>
                    {b1}
                </button>}
                {b2 && <button type="button" className="btn btn-secondary btn-sm rounded-full px-5" onClick={(e)=>handleB2Click(e)} value={b2}>
                    {b2}
                </button>}
                </div>
            </div>
        </div>
    )
}

export default Card;