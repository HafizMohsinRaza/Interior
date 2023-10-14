import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SingleFreelancerCard from "../Components/SingleFreelancerCard";
import RightSection from "../Components/RightSection";
import LeftSection from "../Components/LeftSection";

import Carousel from "react-elastic-carousel";
import { Link, useParams } from "react-router-dom";

function SingleProfessional() {
  const [freelancer, setFreelancer] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const { id } = useParams();

  const fetchFreelancer = () => {
    fetch(`https://interiorme.onrender.com/owner/profile/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFreelancer(result.owner);
      });
  };

  const fetchData = async () => {
    fetch(`https://interiorme.onrender.com/ownerpost/getPostOwner/${id}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log("jj",result.post)
        setData(result.post);
      });
  };

  const fetchData2 = async () => {
    fetch(
      `https://interiorme.onrender.com/ownerpost/getPostOwnerBeforeAfter/${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("jj", result.post);
        setData2(result.post);
      });
  };

  useEffect(() => {
    fetchFreelancer();
    fetchData();
    fetchData2();
  }, [id]);

  // console.log("jj",freelancer._id)
  console.log(data);

  
  const combinePics = () => {
    const combinedData = data2.map((item) => [
      { type: "beforePic", url: item.beforePic },
      { type: "afterPic", url: item.afterPic },
      
    ]);
  
    const combinedPics = [].concat(...combinedData);
  
    return combinedPics;
  };
  
  const combinedPics = combinePics();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 0, itemsToShow: 1 },
    { width: 0, itemsToShow: 1 },
    { width: 1, itemsToShow: 1 },
  ];

  const carouselArrowStyles = {
    position: "absolute",
    top: "45%",
    width: "35px",
    height: "20px",
    fontSize: "33px",
    fontWeight: "700",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.2s ease-in-out",
    _hover: {
      backgroundColor: "gray.200",
    },
    display: "flex",
    visibility: "visible",
  };

  return (
    <Box
      background={"#f7f8f9"}
      m={"auto"}
      w={{ base: "100%", md: "100%", xl: "68%" }}
      p={"40px 0px 40px 0px"}
    >
      {data.length == 0 ? (
        <></>
      ) : (
        <>
          <Box
            overflow="hidden"
            position="relative"
            bg="white"
            borderWidth="1px"
            w={{ base: "100%", md: "80%", lg: "80%" }}
            h={{ base: "300px", lg: "560px" }}
            m={"auto"}
          >
            <Carousel
              pagination={false}
              breakPoints={breakPoints}
              renderArrow={({ type, onClick }) => (
                <div
                  onClick={onClick}
                  style={{
                    ...carouselArrowStyles,
                    left: type === "PREV" ? "10px" : "auto",
                    right: type === "NEXT" ? "10px" : "auto",
                  }}
                >
                  {type === "PREV" ? "<" : ">"}
                </div>
              )}
            >
              {data?.map((el) => (
                <Box w={"100%"}>
                  <Image
                    w={"100%"}
                    transition="all 0.3s"
                    _hover={{ filter: "brightness(1.2)" }}
                    src={el.pics}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box
            fontWeight={"semibold"}
            color={"grey"}
            m={"auto"}
            w={{ base: "100%", md: "80%", lg: "75%" }}
          >
            <Link to={`/singleownerpost/${freelancer._id}`}>
              <Text cursor={"pointer"} textAlign={"right"}>
                View All Photos {">"}
              </Text>
            </Link>
          </Box>
        </>
      )}
      <SingleFreelancerCard freelancer={freelancer} />
      {data2.length == 0 ? (
        <></>
      ) : (
        <>
          <Box mt={"30px"} background={"white"} p={"20px"}>
            <Box
              m={"auto"}
              w={{ base: "100%", md: "80%", lg: "60%" }}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
            >
              <Text textAlign={"left"} fontWeight={"bold"}>
                Our Before and After Projects
              </Text>
              <Box
                overflow="hidden"
                position="relative"
                bg="white"
                borderWidth="1px"
                w={{ base: "100%", md: "80%", lg: "100%" }}
                m={"auto"}
                h={{base:"200px",lg:"500px"}}
                display={"flex"} alignItems={"center"}
              >
                <Carousel
                  pagination={false}
                  breakPoints={breakPoints}
                  renderArrow={({ type, onClick }) => (
                    <div
                      onClick={onClick}
                      style={{
                        ...carouselArrowStyles,
                        left: type === "PREV" ? "10px" : "auto",
                        right: type === "NEXT" ? "10px" : "auto",
                      }}
                    >
                      {type === "PREV" ? "<" : ">"}
                    </div>
                  )}
                >
                {combinedPics.map((pic, index) => (
                  <Box key={index} w={"100%"} alignItems={"center"}>
                    {/* Slider: Display either 'afterPic' or 'beforePic' */}
                    <Image
                      w={"100%"} h={{base:"200px",lg:"500px"}}
                      transition="all 0.3s"
                      _hover={{ filter: "brightness(1.2)" }}
                      src={pic.url}
                    />
                  </Box>
                ))}
                </Carousel>
              </Box>
              <Box
                fontWeight={"semibold"}
                color={"grey"}
                m={"auto"}
                w={{ base: "100%", md: "80%", lg: "100%" }}
              >
                <Link to={`/beforeafter/${freelancer._id}`}>
                  <Text cursor={"pointer"} textAlign={"right"}>
                    View All Photos {">"}
                  </Text>
                </Link>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <Flex
        direction={{ base: "column", lg: "row" }}
        background={"#f7f8f9"}
        w={"100%"}
        m={"auto"}
        gap={"20px"}
        justifyContent={"space-between"}
        p={"35px 0px 35px 0px"}
      >
        <Box
          w={{ base: "100%", md: "80%", lg: "70%" }}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <LeftSection freelancer={freelancer} />
        </Box>
        <Box w={{ base: "100%", md: "80%", lg: "28%" }}>
          <RightSection freelancer={freelancer} />
        </Box>
      </Flex>
    </Box>
  );
}

export default SingleProfessional;
