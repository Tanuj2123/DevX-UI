import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../utils/constants";


const Settings = () => {

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [message,setMessage] = useState("");

    const handleClick = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.patch(BACKEND_URL+"/profile/updatePassword",{oldPassword,newPassword},{withCredentials:true});

            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }

    }
  return (
    <div className="flex justify-center px-4 py-10">
        <form className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
            <div className="card-body gap-5 p-6 sm:p-8">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Account settings</p>
                    <h1 className="text-2xl font-bold text-base-content">Change password</h1>
                    <p className="text-sm text-base-content/60">Choose a new password for your account.</p>
                </div>

                <div className="grid gap-4">
                    <label className="form-control w-full gap-1">
                        <span className="label-text font-medium">Current password</span>
                        <input
                            className="input input-bordered w-full"
                            type="password"
                            autoComplete="current-password"
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full gap-1">
                        <span className="label-text font-medium">New password</span>
                        <input
                            className="input input-bordered w-full"
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </label>
                </div>
                <p className="text-red-700">{message}</p>
                <div className="card-actions justify-end pt-1">
                    <button className="btn btn-primary w-full sm:w-auto" type="submit" onClick={(e)=>handleClick(e)}>
                        Change password
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Settings