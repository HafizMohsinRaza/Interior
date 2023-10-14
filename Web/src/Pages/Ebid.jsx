import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Circle,
  Flex,
  Image,
  Spinner,
  Text
} from "@chakra-ui/react";

import { BiMessageDetail } from "react-icons/bi";
import { MdIosShare } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { GiPhotoCamera } from "react-icons/gi";
import { AiFillProject } from "react-icons/ai";
import { Link } from "react-router-dom";

const Ebid = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    fetch("https://interiorme.onrender.com/post/get")
      .then((res) => res.json())
      .then((result) => {
        // console.log("jj",result)
        setLoading(false);
        setPosts(result.posts);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchUser = () => {
    fetch("https://interiorme.onrender.com/user/getprofile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setUser(result);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      {localStorage.getItem("role") == "Customer" ||
      localStorage.getItem("token") == null ? (
        <Box w="full" p={"20px 0px 20px 0px"}>
          <Link to="/postebid">
            <Box
              boxShadow={"base"}
              w={"50%"}
              m={"auto"}
              p={"20px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"20px"}
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text
                  fontSize={{ base: "10px", lg: "20px" }}
                  fontWeight={"bold"}
                >
                  New Post
                </Text>
                <Text
                  fontSize={{ base: "5px", lg: "15px" }}
                  color={"#ef492d"}
                  fontWeight={"semibold"}
                >
                  Project is For
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={"10px"}>
                <Circle>
                  <Avatar
                    border={"2px solid #dcdcdc"}
                    name={user.name}
                    src={user.pic}
                  />
                </Circle>
                <Text fontSize={{ base: "5px", lg: "15px" }}>
                  Project title...Something in your mind?
                </Text>
              </Flex>

              <Flex
                justifyContent={"space-evenly"}
                gap={"5px"}
                direction={{ base: "column", lg: "row" }}
              >
                <Flex
                  w={{ base: "100%", md: "80%", lg: "14%" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={"3px 8px 3px 8px"}
                  bg={"#dcdcdc"}
                >
                  <CiLocationOn />
                  <Text fontSize={{ base: "5px", lg: "15px" }}>Location</Text>
                </Flex>
                <Flex
                  w={{ base: "100%", md: "80%", lg: "15%" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={"3px 8px 3px 8px"}
                  bg={"#dcdcdc"}
                >
                  <GiPhotoCamera />
                  <Text fontSize={{ base: "5px", lg: "15px" }}>Photos</Text>
                </Flex>
                <Flex
                  w={{ base: "100%", md: "80%", lg: "24%" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={"3px 8px 3px 8px"}
                  bg={"#dcdcdc"}
                >
                  <AiFillProject />
                  <Text fontSize={{ base: "5px", lg: "15px" }}>
                    Project Category
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Link>
        </Box>
      ) : (
        <></>
      )}
      {loading ? (
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black.500"
          size="xl"
          mt={"30px"}
          mb={"30px"}
        />
      ) : (
        <Box display={"flex"} flexDirection={"column"} gap={"10px"} mt={"20px"}>
          {posts
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.map((el) => (
              <Box
                p={"20px"}
                w={{ base: "100%", md: "80%", lg: "60%" }}
                h={{ base: 550, lg: 670 }}
                m={"auto"}
                boxShadow={"base"}
                borderRadius={"10px"}
                key={el._id}
              >
                <Box
                  m={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"20px"}
                >
                  <Link to={`/e-bid/${el._id}`}>
                    <Flex gap={"20px"}>
                      <Circle>
                        <Avatar
                          border={"2px solid #dcdcdc"}
                          size={{ base: "md", lg: "lg" }}
                          name={el?.postedBy?.name}
                          src={el?.postedBy?.pic}
                        />
                      </Circle>
                      <Flex
                        w={"100%"}
                        direction={{ base: "column", lg: "row" }}
                        justifyContent={"space-between"}
                      >
                        <Box>
                          <Text
                            fontSize={{ base: "13px", lg: "23px" }}
                            fontWeight={"semibold"}
                            textAlign={"left"}
                          >
                            {el?.postedBy?.name}
                          </Text>
                          <Flex
                            color={"darkgrey"}
                            fontWeight={"bold"}
                            direction={{ base: "column", lg: "row" }}
                            gap={"10px"}
                            fontSize={{ base: "10px", lg: "15px" }}
                          >
                            <Text textAlign={"left"}>{el?.location.substring(0,60)}</Text>
                            <Text textAlign={"left"}>
                              {el?.updatedAt.substring(0, 10)}
                            </Text>
                          </Flex>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} pt={"5px"}>
                          <Badge
                            fontSize={{ base: "10px", lg: "14px" }}
                            variant="subtle"
                            colorScheme="green"
                          >
                            {el.projectCategory}
                          </Badge>
                        </Box>
                      </Flex>
                    </Flex>
                  </Link>

                  <Link to={`/e-bid/${el._id}`}>
                    <Box pl={"70px"}>
                      <Text
                        textAlign={"left"}
                        fontStyle={"italic"}
                        fontSize={{ base: "10px", lg: "17px" }}
                      >
                        {el.description}
                      </Text>
                    </Box>
                  </Link>

                  <Link to={`/e-bid/${el._id}`}>
                    <Box
                      w={{ base: "100%", md: "80%", lg: "64%" }}
                      h={{ base: 300, lg: 400 }}
                      m={"auto"}
                      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                    >
                      <Image w={"100%"} h={"100%"} src={el?.pic[0]} />
                    </Box>
                  </Link>

                  <Flex
                    fontWeight={"bold"}
                    borderTop={"1px solid grey"}
                    borderBottom={"1px solid grey"}
                    justifyContent={"space-between"}
                    w={"95%"}
                    m={"auto"}
                    pt={"10px"}
                    pb={"10px"}
                    mt={"20px"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      pl={{ base: "", lg: "10px" }}
                    >
                      <BiMessageDetail style={{ fontSize: "25px" }} />
                      <Text fontSize={{ base: "10px", lg: "17px" }}>
                        {el?.comments?.length} Bids
                      </Text>
                    </Box>
                    <Box
                      fontSize={{ base: "10px", lg: "17px" }}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {el?.projectIsFor}
                    </Box>
                    <Box
                      p={{ base: "0px 15px 0px 15px", lg: "0px 30px 0px 30px" }}
                    >
                      <MdIosShare
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        onClick={() => handleShare(el)}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
};

export default Ebid;
