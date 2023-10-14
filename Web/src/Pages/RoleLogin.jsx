import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';


import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading,setLoading] = useState(false);

  const toast = useToast();
  const auth = useContext(AppContext);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      toast({
        title: "Please write a valid Email !",
        status: "error",
        isClosable: true,
        position: "top",
      })
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('https://interiorme.onrender.com/owner/otpSend', {
        email
      });

      // Store the token in localStorage
      // localStorage.setItem('token', response.data.token);
      // localStorage.setItem('role',response.data.role);
      // localStorage.setItem('ownerId',response.data.ownerId);
      console.log(response)
      toast({
        title: "OTP Sent, Please check your mail!",

        status: "success",

        isClosable: true,
        position: "top",
      })
      setLoading(false)
      if(response.status == 200){
        navigate("/owner/otp",{state:email})
      }
      else{
        toast({
          title:response.response.data.error,
          status:"error",
          isClosable:true,
          position:"top"
        })
      }
      // auth.handleLogin(response.data.token)
      // if(localStorage.getItem("role") == "Professional")
      // {
      //   navigate('/profAccount')
      //   window.location.reload()
      // }
      // else{
      //   navigate('/freelAccount')
      //   window.location.reload()
      // }
      // Redirect the user to the dashboard or another protected page
      // You can use a router like React Router for this
    } catch (error) {
      toast({
        title: "This Owner is not Exist!",

        status: "error",

        isClosable: true,
        position: "top",
      })
      console.log(error);
      setLoading(false)
    }
  };

  return (
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
          <Flex alignItems="center" justifyContent="space-between">
            <Checkbox
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              
            >
              Remember me
            </Checkbox>
            <Link to='/resetPasswordOnwer' ><Text color="#f20505">Forget your password?</Text></Link>
          </Flex>
          <Box >
            <Button isLoading={loading} type="submit" bg="#f20505" w="100%" h="40px" color="white">
              Login
            </Button>
          </Box>
        </Stack>
      </form>

    </Box>
  );
}


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading,setLoading] = useState(false);

  const toast = useToast()
  const navigate = useNavigate()

const handleSubmit = async (e) => {
 

  // const data = {
  //   name: username,
  //   email,
  //   password,
  //   role: role,
  // };
  // console.log(data);

  e.preventDefault();
  setLoading(true)
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    toast({
      title: "Please write a valid Email !",

      status: "error",

      isClosable: true,
      position: "top",
    })
    setLoading(false)
    return
  }
  if(password.length <= 8)
  {
    toast({
      title: "Please write attleast 9 character Password!",

      status: "error",

      isClosable: true,
      position: "top",
    })
    setLoading(false)
    return
  }
  fetch("https://interiorme.onrender.com/owner" , {
      method:"POST",
      headers:{
          'Content-Type':"application/json"
      },
      body:JSON.stringify({
        name: username,
        email,
        password,
        role: role,
      })
  })
  .then(res => res.json())
  .then(data => {
      console.log(data)
      toast({
        title: "Registered Successfully",

        status: "success",

        isClosable: true,
        position: "top",
      })
      setLoading(false)
      window.location.reload()
      navigate("/rolelogin")
  })
  .catch(err => {
      console.log(err)
      toast({
        title: "Error in Registring",

        status: "failure",

        isClosable: true,
        position: "top",
      })
      setLoading(false)
  })
};

  

  return (
    <Box w="100%" mx="auto" >
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
            bg="white"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
            bg="white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              </FormControl>
              <FormControl isRequired>
              <FormLabel>Account Type</FormLabel>
              <Select
              bg="white"
              placeholder="Select account type"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              >
              <option value="Professional">Professional</option>
              <option value="Freelancer">Freelancer</option>
              
              </Select>
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
              <FormControl>
                <Box display={"flex"} justifyContent="flex-start">
                    
              <Checkbox
              
              isChecked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              >
              I accept the terms and conditions
              </Checkbox>
                  </Box>
              </FormControl>
              <Button
                       type="submit"
                       bg="#f20505" w="100%" h="40px" color="white"
                       fontSize="md"
                       disabled={!termsAccepted}
                       isLoading={loading}
                     >
              Register
              </Button>
            
              </Stack>
              </form>
              </Box>
              );
              }
              
              function RoleLogin() {
              const [showLogin, setShowLogin] = useState(true);
              
              const handleToggle = () => {
              setShowLogin(!showLogin);
              };
              
              return (
              <Box mt="30px" minH="100vh" bg={"inherit"}>
                <Heading fontWeight={"500"} fontSize="25px" mb="20px">Owner-Login-Register</Heading>
              <Box w={["90%","80%","48%"]} mx="auto" >
              <Box
                bg={"inherit"}
                rounded="lg"
              >
              <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Box>
              <Text fontSize="2xl" fontWeight="bold">
              {showLogin ? 'Login' : 'Register'}
              </Text>
              </Box>
              <Box>
              <Button
              size="sm"
              variant="link"
              onClick={handleToggle}
              color={useColorModeValue('blue.500', 'blue.300')}
              >
              {showLogin ? 'Create an account' : 'Login with existing account'}
              </Button>
              </Box>
              </Flex>
              {showLogin ? <LoginForm /> : <RegisterForm />}
              </Box>
              </Box>
              </Box>
              );
              }
              
              export default RoleLogin;
