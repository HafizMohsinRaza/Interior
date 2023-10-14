import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { AiOutlineMinusCircle, AiOutlineShrink } from "react-icons/ai";
import HeartLike from "./HeartLike";
import { BiBed, BiTime } from "react-icons/bi";

function BeforeAfterSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [visibleProducts, setVisibleProducts] = useState(6);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 10);
      setLoading(false);
    }, 1000); // simulate loading delay
  };

  const hasMoreProducts = visibleProducts < data.length;

  const fetchData = () => {
    fetch(`https://interiorme.onrender.com/ownerpost/getAllBeforeAfter`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 420, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];

  const carouselArrowStyles = {
    position: "absolute",
    top: "25%",
    width: "20px",
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
    <>
      <Box w={"100%"}>
        <Heading textAlign="left" mb="20px" mt={"20px"}>
          Before And After Post Images
        </Heading>
        <Box>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            direction={{ base: "column", md: "row" }}
            gap="40px"
            pl={"20px"}
            pr={"20px"}
          >
            {data?.slice(0, visibleProducts).map((el, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                bg="white"
                pt={"10px"}
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
                  <Box w={"100%"} h={"250px"} key={index}>
                    <Image
                      src={el.afterPic}
                      transition="all 0.3s"
                      _hover={{ filter: "brightness(1.2)" }}
                      key={index}
                      alt={el.title}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      borderRadius={"5px"}
                    />
                  </Box>
                  <Box w={"100%"} h={"250px"}>
                    <Image
                      src={el.beforePic}
                      transition="all 0.3s"
                      _hover={{ filter: "brightness(1.2)" }}
                      key={index}
                      alt={el.title}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      borderRadius={"5px"}
                    />
                  </Box>
                </Carousel>

                <Tooltip label="Preview" placement="top" hasArrow>
                  <Box
                    w="36px"
                    h="36px"
                    bg="#343332"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    bottom="200px"
                    right="145px"
                  >
                    <Icon as={AiOutlineShrink} w={6} h={6} color="white" />
                  </Box>
                </Tooltip>

                <HeartLike />

                <Tooltip label="Add To Compare" placement="top" hasArrow>
                  <Box
                    w="36px"
                    h="36px"
                    bg="#343332"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    bottom="200px"
                    right="15px"
                  >
                    <Icon as={AiOutlineMinusCircle} w={6} h={6} color="white" />
                  </Box>
                </Tooltip>

                <Box position="absolute" bottom="78px" right="4">
                  <Button
                    color="white"
                    bg="#f20505"
                    fontSize={"17px"}
                    fontWeight="600"
                  >
                    Details
                  </Button>
                </Box>

                <Box>
                  <Stack p="4" spacing="8" textAlign={"left"}>
                    <Heading _hover={{ color: "red" }} fontSize="18px">
                      {el.bandfTitle}
                    </Heading>

                    <Text fontSize={"17px"} fontWeight="500">
                      {el.bandfProjectType}
                    </Text>
                  </Stack>
                  <Box border="3px solid #f7f8f9"></Box>
                  <Flex p="4" mt="3px" justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={"5px"}>
                      <Icon as={BiBed} w={6} h={6} color="black" />
                      <Text
                        fontSize={{ base: "10px", lg: "15px" }}
                        color={"grey"}
                        fontWeight={"hairline"}
                      >
                        {el?.postedBy?.companyName}
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={"5px"}>
                      <Icon as={BiTime} w={6} h={6} color="black" />
                      <Text
                        fontSize={{ base: "10px", lg: "15px" }}
                        color={"grey"}
                        fontWeight={"hairline"}
                      >
                        {el.updatedAt.substring(0, 10)}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        {hasMoreProducts && (
          <Flex justify="center" mt={4}>
            <Button
              bg="inherit"
              w="200px"
              h="45px"
              border="1px solid #f20505"
              _hover={{ color: "#fff", backgroundColor: "#f20505" }}
              color="#f20505"
              onClick={handleLoadMore}
              isLoading={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
}

export default BeforeAfterSection;
