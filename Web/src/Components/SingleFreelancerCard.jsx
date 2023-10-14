import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Rating from "./Rating";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { SlShareAlt } from "react-icons/sl";
import { MdVerifiedUser } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";

function SingleFreelancerCard({ freelancer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("tel:"+freelancer?.contact || "","ll")

  const ratings = freelancer?.reviews?.map((review) => review.rating);

  const sum = ratings?.reduce((total, rating) => total + rating, 0);
  const averageRating = (sum / ratings?.length).toFixed(1);

  const handleShare = (post) => {
    const shareData = {
      title: "Share Post",
      text: `Check out this post: ${post.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for platforms without the Web Share API
      const socialMediaSharingUrls = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${shareData.text}\n${shareData.url}`
        )}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareData.url
        )}`,
        // Add more social media platforms and their sharing URLs as needed
      };

      const platform = prompt("Choose a platform to share: whatsapp, facebook");
      const sharingUrl = socialMediaSharingUrls[platform];

      if (sharingUrl) {
        window.open(sharingUrl, "_blank");
      } else {
        console.log("Invalid platform selected");
      }
    }
  };

  return (
    <>
      <Box m={"auto"} w={"100%"} p={"35px 40px 35px 40px"} background={"white"}>
        <Flex gap={"20px"} direction={["column", "row"]}>
          <Box w={{ base: "100%", md: "40%", lg: "35%" }} h={{base:"300px",lg:"230px"}}>
            <Image w={"100%"} h={"100%"} src={freelancer.pic} />
          </Box>
          <Box w={"100%"}>
            <Box
              p={"1px 10px 20px 0px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"20px"}
            >
              <Text fontWeight={"bold"} fontSize={"23px"} textAlign={"left"}>
                {freelancer?.companyName}
              </Text>
              {freelancer?.reviews?.length == 0 ? (
                <>
                  <Text textAlign={"left"} color={"lightgrey"}>
                    Their is no Reviews
                  </Text>
                </>
              ) : (
                <Box display={"flex"} gap={"8px"}>
                  {averageRating} <Rating value={averageRating} />{" "}
                  <a href="#review">
                    <Text>See all reviews</Text>
                  </a>{" "}
                </Box>
              )}
              <Text
                display={"flex"}
                alignItems={"center"}
                color={"#979292"}
                gap={"5px"}
                fontWeight={"light"}
                fontSize={{base:"10px",lg:"15px"}}
              >
                <IoLocationOutline />
                {freelancer.address || freelancer.city || freelancer.country ? (
                  `${freelancer.address || ""} ${freelancer.city || ""} ${freelancer.country || ""}`
                ) : (
                  "Their is no location"
                )}
              </Text>
              <Flex alignItems={"center"} gap={"5px"}>
                <MdVerifiedUser style={{ color: "red", fontSize: "25px" }} />
                <Text color={"red"}>Verified</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
        <Box
          p={"40px 0px 0px 0px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
        >
          <Flex gap={"10px"} justifyContent={"space-between"}>
            <Flex
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
              gap={"15px"}
              
            >
              {freelancer?.role == "Freelancer" ? (
                <>
                  <Circle
                    cursor={"pointer"}
                    onClick={onOpen}
                    border={"2px solid grey"}
                    p={"5px"}
                  >
                    <IoIosMail style={{ fontSize: "35px", color: "#41bbf2" }} />
                  </Circle>
                  <Text
                    cursor={"pointer"}
                    onClick={onOpen}
                    fontSize={{ base: "10px", lg: "20px" }}
                  >
                    Mail me
                  </Text>
                </>
              ) : (
                <>
                  <a
                    href={
                      freelancer?.contact && freelancer.contact[0]
                        ? `tel:${freelancer.contact[0]}`
                        : ""
                    }
                  >
                    <Flex alignItems={"center"} gap={{base:"9px",lg:"10px"}} direction={{ base: "column", lg: "row" }}>
                      <Circle
                        border={"2px solid grey"}
                        p={{ base: "10px", lg: "10px" }}
                      >
                        <BsFillTelephoneFill
                          style={{ fontSize: "25px", color: "green" }}
                        />
                      </Circle>
                      <Text fontSize={{ base: "10px", lg: "20px" }}>
                        Call Us
                      </Text>
                    </Flex>
                  </a>
                </>
              )}
            </Flex>
            <Flex
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
              gap={{base:"3px",lg:"0px"}}
              pl={"10px"}
            >
              <Circle p={"10px"} onClick={() => handleShare(freelancer)}>
                <SlShareAlt style={{ fontSize: "35px", cursor: "pointer" }} />
              </Circle>
              <Text fontSize={{ base: "10px", lg: "20px" }}>Share</Text>
            </Flex>
            <Flex
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
              gap={{base:"10px",lg:"10px"}}
            >
              <Circle
                bg={"#eeeeee"}
                title="Add to Wishbook"
                cursor={"pointer"}
                p={{ base: "10px", lg: "5px" }}
              >
                <AiFillHeart style={{ fontSize: "30px" }} />
              </Circle>
              <Text fontSize={{ base: "10px", lg: "20px" }}>
                Save to Wishbook
              </Text>
            </Flex>
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
                    <Text>To:</Text>
                    <Input variant="unstyled" />
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

export default SingleFreelancerCard;
