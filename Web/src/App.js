
import { useContext, useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './Pages/AllRoutes';
import Footer from './Pages/Footer';
import Navbar from './Pages/Navbar';
import ScrollToTop from './Components/ScrollTop';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from './Context/AppContext';
import axios from 'axios';

function App() {
  const [search,setSearch] = useState("");

  const auth = useContext(AppContext)
  const {user , getAccessTokenSilently} = useAuth0();
  // console.log(user,"userDetails");

  const sendUserDataToBackend = async (userData) => {
    if(user !== undefined){
      try {
        const response = await axios.post('https://interiorme.onrender.com/user/social', userData); // Replace with your backend API endpoint
        const responseData = response.data;
        // Handle the response data (e.g., update state or perform other actions)
        console.log(responseData)
        localStorage.setItem("token",responseData.token)
        localStorage.setItem("userId",responseData?.user?._id)
        const role = "Customer"
        localStorage.setItem("role",role)
        auth.handleLogin(responseData.token)
      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
    }else{
      
    }
  };
  
  useEffect(() => {
    // Assuming you have user data available from Auth0
    sendUserDataToBackend(user);
  }, [user]);

  console.log(user,"sahil")

  return (
    <div className="App">
      <Navbar setSearch={setSearch} search={search} />
      <AllRoutes search={search} />
      <Footer/>
      <ScrollToTop/>
    </div>
  );
}

export default App;
