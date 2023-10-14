import { Box, Button, Circle, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import Rating from "./Rating";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function SavedProfessionalCard({
  pic,
  companyName,
  rating,
  address,
  city,
  country,
  reviews,
  refId,
}) {
  const ratings = reviews?.map((review) => review.rating);

  const sum = ratings?.reduce((total, rating) => total + rating, 0);
  const averageRating = (sum / ratings?.length).toFixed(1);

  // console.log(reviews,"lll")
  return (
    <>
      <Box
        w={{ base: "100%", md: "50%", lg: "100%" }}
        background={"white"}
        display={"flex"}
        gap={"20px"}
        p={"25px"}
      >
        <Box w={{ base: "20%", lg: "40%" }}>
          <Image w={"100%"} src={pic} />
        </Box>

        <Box
          w={{ base: "70%", md: "50%", lg: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={"18px"}
        >
          <Flex justifyContent={"space-between"} p={"0px 12px 0px 0px"}>
            <Link to={`/professionals/${refId}`}>
              <Text
                fontWeight={"medium"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "15px", lg: "20px" }}
                textAlign={"left"}
              >
                {companyName}
              </Text>
            </Link>
          </Flex>
          {reviews?.length == 0 ? (
            <>
              <Box display={"flex"} alignItems={"center"}>
                <Text color={"lightgrey"}>Their is no Review</Text>
              </Box>
            </>
          ) : (
            <Flex gap={"10px"} alignItems={"center"}>
              {averageRating} <Rating value={averageRating} />
              <Text
                fontSize={{ base: "10px", lg: "15px" }}
                fontWeight={"semibold"}
                color={"grey"}
              >
                {reviews?.length} Reviews
              </Text>
            </Flex>
          )}
          <Text
            fontSize={{ base: "10px", lg: "15px" }}
            display={"flex"}
            alignItems={"center"}
            color={"#979292"}
            gap={"5px"}
          >
            <IoLocationOutline /> {address + " " + city + " " + country}
          </Text>

          <Flex
            mt={{ base: "0px", lg: "60px" }}
            p={"10px"}
            justifyContent={"space-between"}
          >
            <Button
              fontSize={{ base: "13px", lg: "15px" }}
              border={"1px solid red"}
              color={"red"}
              variant={"outline"}
              p={{ base: "8px", lg: "5px 65px 5px 65px" }}
              borderRadius={"20px"}
            >
              Send Message
            </Button>
            <Circle
              color={"green"}
              fontSize={{ base: "13px", lg: "20px" }}
              border={"1px solid black"}
              p={{ base: "12px", lg: "10px" }}
            >
              <BsFillTelephoneFill style={{ color: "green" }} />
            </Circle>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default SavedProfessionalCard;
