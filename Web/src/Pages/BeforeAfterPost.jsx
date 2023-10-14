import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-elastic-carousel";

function BeforeAfterPost() {
  const [data, setData] = useState([]);

  const { id } = useParams();

  const fetchData = async () => {
    fetch(
      `https://interiorme.onrender.com/ownerpost/getPostOwnerBeforeAfter/${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log("jj", result.post);
        setData(result.post);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data, "after");

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 0, itemsToShow: 1 },
    { width: 0, itemsToShow: 1 },
    { width: 1, itemsToShow: 1 },
  ];

  const carouselArrowStyles = {
    position: "absolute",
    top: "45%",
    width: "55px",
    height: "20px",
    fontSize: "33px",
    fontWeight: "700",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
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
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        mt={"20px"}
        mb={"20px"}
      >
        {data?.map((el) => (
          <Box
            overflow="hidden"
            position="relative"
            bg="white"
            borderWidth="1px"
            w={{ base: "100%", md: "80%", lg: "40%" }}
            m={"auto"}
            boxShadow={"2xl"}
            borderRadius={"10px"}
            p={"10px 0px 10px 0px"}
            h={{base:"330px",lg:"550px"}}
          >
            <Box>
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
                <Box w={"100%"}>
                  <Image w={"100%"} h={{base:"250px",lg:"450px"}} src={el.afterPic} borderRadius={"20px"} />
                </Box>
                <Box w={"100%"}>
                  <Image w={"100%"} h={{base:"250px",lg:"450px"}} src={el.beforePic} borderRadius={"20px"} />
                </Box>
              </Carousel>
            </Box>
            <Box>
              <Flex
                pr={"20px"}
                color={"grey"}
                justifyContent={"flex-end"}
                gap={"5px"}
              >
                <Text textDecoration={"underline"} fontStyle={"italic"}>
                  Project Type:{" "}
                </Text>
                <Text textDecoration={"underline"} fontStyle={"italic"}>
                  {el.bandfProjectType}
                </Text>
              </Flex>
              <Flex
                pr={"20px"}
                color={"grey"}
                justifyContent={"flex-end"}
                gap={"5px"}
              >
                <Text
                  fontWeight={"bold"}
                  fontSize={"17px"}
                  fontStyle={"italic"}
                >
                  Project Title:
                </Text>
                <Text
                  fontWeight={"bold"}
                  fontSize={"17px"}
                  fontStyle={"italic"}
                >
                  {el.bandfTitle}
                </Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default BeforeAfterPost;
