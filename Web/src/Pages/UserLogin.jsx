import React from 'react';
import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

function UserLogin() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()


  const auth = useContext(AppContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://interiorme.onrender.com/user/login', {
        email,
        password,
      });

      // Store the token in localStorage
      
      // console.log(response)
      toast({
        title: "Login Succesfully Done!",

        status: "success",

        isClosable: true,
        position: "top",
      })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role',response.data.role);
        auth.handleLogin(response.data.token)
        navigate("/")
      // Redirect the user to the dashboard or another protected page
      // You can use a router like React Router for this
      } catch (error) {
      toast({
        title: error.response.data.msg,

        status: "error",

        isClosable: true,
        position: "top",
      })
      console.log(error);
    }
  };
  return (
    <>
    <Box w="100%" mx="auto" >
     
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              bg="white"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              bg="white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Flex alignItems="center" justifyContent="space-between">
            <Checkbox
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              
            >
              Remember me
            </Checkbox>
            <Text color="#f20505">Lost your password?</Text>
          </Flex>
          <Box >
            <Button type="submit" bg="#f20505" w="100%" h="40px" color="white">
              Login
            </Button>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Button
              variant="outline"
              bg="#506dab"
              color="white"
              w="100%"
              h="40px"

             
              leftIcon={<FaFacebook />}
            >
              Login with Facebook
            </Button>
            <Button
              variant="outline"
              bg="#4285f4 "
              color="white"
              w="100%"
              h="40px"
              mt="20px"
              leftIcon={<FaGoogle />}
            >
              Login with Google
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
    </>
  )
}

export default UserLogin