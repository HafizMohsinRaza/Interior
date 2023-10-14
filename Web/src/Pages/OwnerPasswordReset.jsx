import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

function OwnerPasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const sendLink = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await fetch(
      "https://interiorme.onrender.com/owner/sendpasswordlinkowner",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    if (data.status == 201) {
      setEmail("");
      setMessage(true);
      setLoading(false);
    } else {
      toast({
        title: "Invalid User!",
        status: "error",
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
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
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>
          {message ? (
            <Text color={"green"} fontWeight={"bold"}>
              Password reset link send successfully in your email!
            </Text>
          ) : (
            <></>
          )}
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={sendLink}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              isLoading={loading}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default OwnerPasswordReset;
