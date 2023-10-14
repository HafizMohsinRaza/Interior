import { Box, Text } from "@chakra-ui/react";
import React from "react";

function AboutSection({ freelancer }) {
  return (
    <Box
      w={{ base: "100%", lg: "100%" }}
      p={"30px"}
      background={"white"}
      display={"flex"}
      flexDirection={"column"}
      gap={"5px"}
    >
      <Box>
        <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
          About All {freelancer.companyName}
        </Text>
      </Box>
      <Box>
        <Text fontWeight={"light"} wordBreak={"break-all"} textAlign={"left"}>
          {freelancer.aboutUs}
        </Text>
      </Box>

      {freelancer?.role == "Freelancer" ? (
        <>
          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Area of Survice
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight={"light"}
              wordBreak={"break-all"}
              textAlign={"left"}
            >
              {freelancer?.areaOfSurvice}
            </Text>
          </Box>

          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Email Id
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight={"light"}
              wordBreak={"break-all"}
              textAlign={"left"}
            >
              {freelancer?.emailId}
            </Text>
          </Box>
        </>
      ) : (
        <></>
      )}

      <Box>
        <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
          Survice Provided
        </Text>
      </Box>
      <Box>
        <Text fontWeight={"light"} wordBreak={"break-all"} textAlign={"left"}>
          {freelancer?.services?.join(",")}
        </Text>
      </Box>

      <Box>
        <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
          Work Category
        </Text>
      </Box>
      <Box>
        <Text fontWeight={"light"} wordBreak={"break-all"} textAlign={"left"}>
          {freelancer.category}
        </Text>
      </Box>

      {freelancer?.role == "Freelancer" ? (
        <></>
      ) : (
        <>
          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Our Achievements
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight={"light"}
              wordBreak={"break-all"}
              textAlign={"left"}
            >
              {freelancer.achievements}
            </Text>
          </Box>

          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Professional Information
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight={"light"}
              wordBreak={"break-all"}
              textAlign={"left"}
            >
              {freelancer.profInfo}
            </Text>
          </Box>

          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Project Starting Cost
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight={"light"}
              wordBreak={"break-all"}
              textAlign={"left"}
            >
              ₹ {freelancer.projectStartingCost}
            </Text>
          </Box>
        </>
      )}

      
    </Box>
  );
}

export default AboutSection;

{/* 
{freelancer?.role == "Freelancer" ? (
        <>
          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Freelancer Email
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Text fontSize={"18px"} textAlign={"left"} fontWeight={"bold"}>
              Professional Email
            </Text>
          </Box>
        </>
      )}
      <Box>
        <Text fontWeight={"light"} wordBreak={"break-all"} textAlign={"left"}>
          {freelancer.email}
        </Text>
      </Box>
*/}