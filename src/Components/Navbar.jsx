import { useDispatch, useSelector } from "react-redux"
import { BACKEND_URL, USER_DEFAULT_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { removeUser } from "../store/user.slice";


const Navbar = ()=>{

    const user = useSelector(state=> state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async ()=>{
      const res = await axios.post(BACKEND_URL+"/auth/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login")
    }

      return (
        <div className="navbar bg-base-300 shadow-sm p-2 py-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" to="/">DevX</a>
        </div>
         {user && <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoUrl || USER_DEFAULT_URL} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </div>}
      </div>
    )
}


export default Navbar