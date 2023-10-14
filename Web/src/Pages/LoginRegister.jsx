import { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginButton, LogoutButton } from "../oAuth/OAuth.config";
import { AppContext } from "../Context/AppContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast({
        title: "Please write a valid Email !",

        status: "error",

        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await axios
        .post("https://interiorme.onrender.com/user/otpSend", {
          email,
        })
        .then((res) => {
          // console.log(res);
          
          toast({
            title: "OTP Sent, Please check your mail!",

            status: "success",

            isClosable: true,
            position: "top",
          });
          setLoading(false);
          if (res.status == 200) {
            navigate("/user/otp", { state: email });
          } else {
            toast({
              title: response.response.data.error,
              status: "error",
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast({
            title: error.response.data.msg,
            status: "error",
            isClosable: true,
            position: "top",
          });
        });
    } catch (error) {
      toast({
        title: "Network Error!",
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.log(error);
      setLoading(false);
    }
  };


  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("https://interiorme.onrender.com/auth/protected", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((resObject) => {
  //         setUser(resObject);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

  // console.log(user,"user")

  return (
    <Box w="100%" mx="auto">
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
            <Link to="/resetPassword">
              <Text color="#f20505">Forget your password?</Text>
            </Link>
          </Flex>
          <Box>
            <Button
              isLoading={loading}
              type="submit"
              bg="#f20505"
              w="100%"
              h="40px"
              color="white"
            >
              Login
            </Button>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <LoginButton/>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    // const data = {
    //   name: username,
    //   email,
    //   password,
    //   role: role,
    // };
    // console.log(data);

    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast({
        title: "Please write a valid Email !",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password.length <= 8) {
      toast({
        title: "Please write attleast 8 character Password!",

        status: "error",

        isClosable: true,
        position: "top",
      });
      return;
    }
    fetch("https://interiorme.onrender.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        toast({
          title: "Registered Successfully",

          status: "success",

          isClosable: true,
          position: "top",
        });
        window.location.reload();
        navigate("/login-register");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error in Registring",

          status: "failure",

          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Box w="100%" mx="auto">
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
            bg="#f20505"
            w="100%"
            h="40px"
            color="white"
            fontSize="md"
            disabled={!termsAccepted}
            isLoading={loading}
          >
            Register
          </Button>
          <Box alignItems="center" justifyContent="center">
            <Button
              variant="outline"
              bg="#506dab"
              color="white"
              w="100%"
              h="40px"
              leftIcon={<FaFacebook />}
            >
              Continue with Facebook
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
              Sign in with Google
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function LoginRegister() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Box mt="30px" minH="100vh" bg={"inherit"}>
      <Heading fontWeight={"500"} fontSize="25px" mb="20px">
        User-Login-Register
      </Heading>
      <Box w={["90%", "80%", "48%"]} mx="auto">
        <Box bg={"inherit"} rounded="lg">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                {showLogin ? "Login" : "Register"}
              </Text>
            </Box>
            <Box>
              <Button
                size="sm"
                variant="link"
                onClick={handleToggle}
                color={useColorModeValue("blue.500", "blue.300")}
              >
                {showLogin
                  ? "Create an account"
                  : "Login with existing account"}
              </Button>
            </Box>
          </Flex>
          {showLogin ? <LoginForm /> : <RegisterForm />}
        </Box>
      </Box>
    </Box>
  );
}

export default LoginRegister;

{/* 
<Button
              variant="outline"
              bg="#506dab"
              color="white"
              w="100%"
              h="40px"
              onClick={handleFacebookAuth}
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
              onClick={handleGoogleAuth}
            >
              Login with Google
            </Button>
*/}
