import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import FreelancerHeartLike from "./FreelancerHeartLike";
import { BsArrowUpCircleFill } from "react-icons/bs";

function FreelancerCard({
  name,
  email,
  id,
  pic,
  companyName,
  address,
  city,
  country,
  reviews,
  services,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ratings = reviews.map((review) => review.rating);

  // Step 2: Calculate the average rating
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const averageRating = (sum / ratings?.length).toFixed(1);

  return (
    <>
      <Box
        w={{ base: "100%", md: "50%", lg: "100%" }}
        background={"white"}
        display={"flex"}
        gap={"20px"}
        p={"25px"}
        key={id}
        h={{base:"250px",lg:"310px"}}
      >
        <Box w={{ base: "40%", lg: "45%" }}>
          <Image w={"100%"} h={"100%"} src={pic} />
        </Box>

        <Box
          w={{ base: "70%", md: "50%", lg: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={{base:"",lg:"15px"}}
        >
          <Flex>
            <Link to={`/freelancer/${id}`}>
              <Text
                fontWeight={"medium"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "10px", lg: "20px" }}
                textAlign={"left"}
              >
                {companyName}
              </Text>
            </Link>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            fontSize={{ base: "8px", lg: "15px" }}
            gap={"10px"}
          >
            {reviews.length == 0 ? (
              <>
                <Text color={"lightgrey"}>Their is no Review</Text>
              </>
            ) : (
              <Flex gap={"10px"} alignItems={"center"}>
                {averageRating} <Rating value={averageRating} />
                <Text
                  fontSize={{ base: "8px", lg: "15px" }}
                  fontWeight={"semibold"}
                  color={"grey"}
                >
                  {reviews.length} Reviews
                </Text>
              </Flex>
            )}
            <FreelancerHeartLike
              name={name}
              email={email}
              pic={pic}
              companyName={companyName}
              address={address}
              city={city}
              country={country}
              rating={reviews.length}
              id={id}
              reviews={reviews}
            />
          </Flex>
          <Text
            textAlign={"left"}
            fontSize={{ base: "8px", lg: "15px" }}
            display={"flex"}
            fontWeight={"semibold"}
            alignItems={"center"}
            color={"#979292"}
            gap={"5px"}
          >
            <IoLocationOutline /> {address + " " + city + " " + country}
          </Text>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              fontWeight={"semibold"}
              fontSize={{ base: "5px", lg: "15px" }}
            >
              {services.join(",").substring(0, 50)} {"..."}
            </Text>
            <Flex alignItems={"center"} gap={"10px"}>
              <Text fontSize={{ base: "0px", lg: "17px" }}>Mail me {">"}</Text>
              <Circle
                onClick={onOpen}
                fontSize={{ base: "13px", lg: "20px" }}
                border={"3px solid grey"}
                p={{ base: "10px", lg: "10px" }}
                cursor={"pointer"}
              >
                <IoIosMail style={{ fontSize: "25px", color: "#41bbf2" }} />
              </Circle>
            </Flex>
          </Flex>
          <Flex
            p={"10px"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
            <Link to="/postebid">
              <Button
                fontSize={{ base: "13px", lg: "15px" }}
                border={"1px solid red"}
                color={"red"}
                variant={"outline"}
                p={{ base: "8px", lg: "5px 65px 5px 65px" }}
                borderRadius={"20px"}
              >
                Place project so we can reach you
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} width={"100%"}>
        <Box>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box h={"500px"}>
                <Box mt={"10px"} display={"flex"} justifyContent={"flex-end"}>
                  <BsArrowUpCircleFill
                    style={{ fontSize: "40px", color: "#017bff" }}
                  />
                </Box>

                <Box>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    borderBottom={"1px solid lightgrey"}
                    p={"10px 0px 10px 0px"}
                  >
                    <Text>To: </Text>
                    <Input variant="unstyled" value={email} />
                  </Flex>

                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    borderBottom={"1px solid lightgrey"}
                    p={"10px 0px 10px 0px"}
                  >
                    <Text>Cc/Bcc, From:</Text>
                    <Input
                      variant="unstyled"
                      w={"50%"}
                      placeholder="Example@gmail.com"
                    />
                  </Flex>

                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    borderBottom={"1px solid lightgrey"}
                    p={"10px 0px 10px 0px"}
                  >
                    <Text>Subject:</Text>
                    <Input variant="unstyled" />
                  </Flex>
                </Box>

                <Box mt={"60px"}>
                  <Text fontWeight={"bold"}>Type: Cutomer</Text>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Box>
      </Modal>
    </>
  );
}

export default FreelancerCard;
