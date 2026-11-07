import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { addUser } from "../store/user.slice";
import { BACKEND_URL } from "../utils/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/auth/signup`,
        { ...formData, age: Number(formData.age) },
        { withCredentials: true },
      );

      if (res.data?.success === true) {
        dispatch(addUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Unable to create your account.");
    }
  };

  return (
    <div className="flex justify-center  px-4 py-8">
      <form
        className="card  max-w-xs border border-base-300 bg-base-200 shadow-xl w-96"
        onSubmit={handleSignUp}
      >
        <div className="card-body gap-4 p-6">
          <div className="mb-1 text-center">
            <h1 className="text-3xl font-bold">DevX</h1>
            <p className="mt-1 text-sm text-base-content/60">Create your account</p>
          </div>
          <div className="flex flex-col gap-3">
            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Name</span>
              <input
                className="input input-bordered w-full"
                id="signup-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Age</span>
              <input
                className="input input-bordered w-full"
                id="signup-age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                min="18"
                required
              />
            </label>

            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Gender</span>
              <select
                className="select select-bordered w-full"
                id="signup-gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select gender...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>

            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Email</span>
              <input
                className="input input-bordered w-full"
                id="signup-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Password</span>
              <input
                className="input input-bordered w-full"
                id="signup-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </label>

            <label className="form-control w-full gap-1">
              <span className="label-text font-medium">Photo URL</span>
              <input
                className="input input-bordered w-full"
                id="signup-photo-url"
                name="photoUrl"
                type="url"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </label>
          </div>
          {errorMessage && <p className="text-sm text-error" role="alert">{errorMessage}</p>}
          <p className="text-center text-sm">
            Already have an account? <Link to="/login" className="link link-primary">Log in</Link>
          </p>
          <button className="btn btn-primary mt-1 w-full" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
