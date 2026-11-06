import { useState } from "react";
import { validateEditData } from "../utils/validations";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/user.slice";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(user?.name || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [message,setMessage] = useState("")

    const handleSubmit = async (e) => {
        setMessage("")
        e.preventDefault();
        const data = validateEditData(name,age,gender,photoUrl);
        if(data === null){
            setMessage("Invalid Updates");
            return;
        }


        try {
            const res = await axios.patch(BACKEND_URL+"/profile",{...data},{withCredentials:true});
            
            dispatch(updateUser(data));
            setMessage(res?.data?.message)
        } catch (error) {
            setMessage(error.response?.data?.message)
        }
    };

    if (!user) return null;

    return (
        <div className="flex justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl"
            >
                <div className="card-body gap-5">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                {photoUrl ? (
                                    <img src={photoUrl} alt={name || "Profile"} />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary text-lg font-bold text-primary-content">
                                        {(name || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">
                                Edit profile
                            </p>
                            <h2 className="text-2xl font-bold text-base-content">{name || "Your profile"}</h2>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Name</span>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-1">Age</span>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-1">Gender</span>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-1">Photo URL</span>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                    </div>
                    <p>{message}</p>
                    <div className="card-actions justify-end pt-2">
                        <button type="submit" className="btn btn-primary">
                            Save Profile
                        </button>
                    </div>
                </div>
            </form>
            <Card data = {{name,age,gender,photoUrl}}/>
        </div>
    );
};

export default EditProfile;