import { Box, Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';

function UserOtp() {

    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);

    const toast = useToast();
    const location = useLocation();
    const auth = useContext(AppContext);
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true);
        if(otp == ""){
            toast({
                title: 'OTP Error',
                description: "Enter Your OTP",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
              setLoading(false)
        }else if(!/[^a-zA-Z]/.test(otp)){
            toast({
                title: 'OTP Error',
                description: "Enter Valid OTP",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
              setLoading(false)
        }else if(otp.length < 6){
            toast({
                title: 'OTP Error',
                description: "Otp Length minimum 6 digit",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
              setLoading(false)
        }else{
            const response = await axios.post("https://interiorme.onrender.com/user/login",{
                otp,
                email:location.state
            })

            console.log(response)
            if(response.status == 200){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role',response.data.role);
                localStorage.setItem('userId',response.data.userId);
                toast({
                    title: 'User Login!',
                    description: response.data.message,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                setLoading(false)
                auth.handleLogin(response.data.token)
                navigate("/")
                window.location.reload()
            }
        }
    }
    
  return (
    <>
    <Box w={{base:"100%",lg:"30%"}} mx="auto" p={{base:"20px",lg:"60px"}} mt={{base:"30px",lg:"100px"}} mb={{base:"30px",lg:"130px"}} >
     
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Please enter your OTP Here!</FormLabel>
          <Input
            bg="white"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormControl>
        <Box >
          <Button isLoading={loading} type="submit" bg="#f20505" w="100%" h="40px" color="white">
            Submit
          </Button>
        </Box>
      </Stack>
    </form>

  </Box>
    </>
  )
}

export default UserOtp