import {BrowserRouter, Routes,Route} from "react-router";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import SignUp from "./Components/SignUp";
import Settings from "./Components/Settings";


function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/connections" element={<Connections/>}></Route>
            <Route path="/requests" element={<Requests/>}></Route>
            <Route path="/settings" element={<Settings/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
