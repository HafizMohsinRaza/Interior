import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OwnerForgotPassword() {
  const { id, token } = useParams();

  // console.log(token);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toast = useToast();

  const navigate = useNavigate();

  const userValid = async () => {
    const res = await fetch(
      `https://interiorme.onrender.com/owner/ownerforgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status == 201) {
      console.log("valid owner");
    } else {
      console.log("Owner is not valid");
      navigate("*");
    }
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://interiorme.onrender.com/owner/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const data = res.json();
    // console.log(data, "sahil");
    if (data) {
      setPassword("");
      setMessage(true);
    } else {
      toast({
        title: "Token Expire , generate new LINK!",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    userValid();
  }, []);
  return (
    <>
      <Flex
        mt={"-100px"}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={6}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter Your New Password
          </Heading>
          {message ? (
            <Text color={"green"} fontWeight={"bold"}>
              Your Password is Succesfully Updated!
            </Text>
          ) : (
            <></>
          )}

          <FormControl id="password">
            <FormLabel>New Password</FormLabel>
            <Input
              placeholder="Enter Your New Password!"
              _placeholder={{ color: "gray.500" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={sendPassword}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default OwnerForgotPassword;
