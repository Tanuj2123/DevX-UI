# Remember 

- to get cookie to your frontend application do two things
- one add credentials:true config in cors() middleware in backend
- two add withCredentials:true in axios request
- to have secure cookie while adding res.cookie in backend add configuration httpOnly:true,secure:true,         sameSite:"lax"


# redux setUp

- install @reduxjs/toolkit , react-redux
- configureStore and Provide to App
- createSlice and useDipatch and useSelector


# toAutenticateUser

- we used an Api call while body is rendered if the api response send the user back the user is autenticated
- and we redirect him to feed Page,it aslo works while switching to multiple pages 

- aslo added navigations,logout feature 