import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router"
import { BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user.slice";


const VerifyEmail = () => {

    const location = useLocation();
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = location?.state;
    const {email} = userData;

    const handleVerifyEmail = async ()=>{

        try {
            const res = await axios.post(BACKEND_URL+"/auth/verifyEmail",{email,otp},{withCredentials:true});
            dispatch(addUser(res.data.userData));
            navigate("/");
            
        } catch (error) {
            console.error(error);
        }
    }
    
    
  return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4 py-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <section className="relative w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-7 shadow-2xl shadow-base-content/10 sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg
              aria-hidden="true"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              DevX account security
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-base-content">
              Verify your email
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-base-content/65">
              Enter the one-time code we sent to your email address to continue.
            </p>
          </div>

          <div className="mt-8">
            <label
              htmlFor="verification-code"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              Verification code
            </label>
            <input
              id="verification-code"
              className="input input-bordered input-lg w-full rounded-xl text-center text-xl font-semibold tracking-[0.45em] placeholder:tracking-normal focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              type="text"
              placeholder="Enter your code"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
            />
            <button
              className="btn btn-primary mt-6 w-full rounded-xl text-base shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              type="button" onClick={handleVerifyEmail}
            >
              Verify email
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-base-content/55">
              Check your inbox and spam folder if you can’t find the message.
            </p>
          </div>
        </section>
      </main>
  )
}

export default VerifyEmail