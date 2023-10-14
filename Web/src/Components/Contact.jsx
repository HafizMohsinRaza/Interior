import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

function Contact({ freelancer }) {
  // console.log(freelancer.youtubeLink, "contact");

  const handleInstagram = () => {
    window.open(freelancer.instagramLink);
  };

  const handleWebsite = () => {
    window.open(freelancer.websiteLink);
  };

  const handleFacebook = () => {
    window.open(freelancer.facebookLink);
  };

  const handleYoutube = () => {
    window.open(freelancer.youtubeLink);
  };

  return (
    <Box
      background={"white"}
      p={"30px"}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
    >
      <Box>
        <Text fontWeight={"bold"} fontSize={"18px"} textAlign={"left"}>
          Contact
        </Text>
      </Box>
      <Box border={"1px solid grey"} h={"33vh"}></Box>
      <Box display={"flex"} alignItems={"center"}>
        <IoLocationOutline style={{ fontSize: "40px" }} />
        <Text
          fontSize={"13px"}
          textAlign={"left"}
          color={"#979292"}
          gap={"5px"}
          fontWeight={"light"}
        >
          {freelancer.address +
            " " +
            freelancer.city +
            " " +
            freelancer.country}
        </Text>
      </Box>
      <Box>
        {freelancer?.contact?.map((el, index) => (
          <Flex
            justifyContent={"space-between"}
            borderBottom={"1px solid grey"}
            p={"5px 5px 5px 0px"}
          >
            <Text fontWeight={"bold"}>Phone no:{index + 1}</Text>
            <Text fontWeight={"light"}>{el}</Text>
          </Flex>
        ))}
      </Box>
      <Box>
        <Text textAlign={"left"} fontSize={"10px"}>
          Find All {freelancer.companyName} on:
        </Text>
        <Flex alignItems={"center"} gap={"14px"} p={"5px"}>
          <CgWebsite
            style={{ color: "#077fc0", cursor: "pointer", fontSize: "18px" }}
            onClick={handleWebsite}
          />
          <FiFacebook
            style={{ color: "#6176af", cursor: "pointer", fontSize: "18px" }}
            onClick={handleFacebook}
          />
          <BsInstagram
            style={{ color: "#93bdd7", cursor: "pointer", fontSize: "18px" }}
            onClick={handleInstagram}
          />
          <AiFillYoutube
            style={{ color: "red", cursor: "pointer", fontSize: "18px" }}
            onClick={handleYoutube}
          />
        </Flex>
      </Box>
    </Box>
  );
}

export default Contact;
