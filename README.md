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

# feed and EditProfile

- created a Card Compoennt and called the feed api and built the feed page
- created a form to edit user data and shown the card sideways to see how the updated card 
- looks like 
- when updated called the updateUser action in userReducer to updated the user across the store to and show in all places 
- faced a little diffculty i send the data to update profile api wrapped up in data object{
    data:{
        name:" ....."
    }
}   but backend expects it as {
    "name":"..."
}
- hella time of debuuging little bit help of AI found it so be careful next time check what backend is expecting and send that data and format 
- used AI to design the card as you know im bad at CSS 