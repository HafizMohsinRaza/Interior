import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Carousel from "react-elastic-carousel";

function AllBeforeAfterImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const fetchData = () => {
    setLoading(true);
    fetch(
      "https://interiorme.onrender.com/ownerpost/getAllOwnerBeforeAfterPost",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.mypost)
        setLoading(false);
        setData(result.mypost);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePost = (id) => {
    fetch(
      `https://interiorme.onrender.com/ownerpost/deleteBeforeAfterOwnerPost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        toast({
          title: "Removed.",
          description: result.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        fetchData();
      });
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 420, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];

  const carouselArrowStyles = {
    position: "absolute",
    top: "45%",
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
      <Box w={"100%"} h={"auto"} pt={"30px"}>
        <Box>
          <Heading>Before & After Images Posts</Heading>
        </Box>
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
          <>
            <Box>
              {data.length == 0 ? (
                <>
                  <Box p={"30px"}>
                    <Text>Their is no any Before & After Posts!</Text>
                  </Box>
                </>
              ) : (
                <>
                  {data.map((el, index) => (
                    <>
                      <Center py={12}>
                        <Box
                          role={"group"}
                          p={6}
                          maxW={"330px"}
                          w={"full"}
                          bg={bg}
                          boxShadow={"2xl"}
                          rounded={"lg"}
                          pos={"relative"}
                          zIndex={1}
                        >
                          <Box
                            rounded={"lg"}
                            mt={-12}
                            pos={"relative"}
                            height={"230px"}
                            _after={{
                              transition: "all .3s ease",
                              content: '""',
                              w: "full",
                              h: "full",
                              pos: "absolute",
                              top: 5,
                              left: 0,
                              backgroundImage: `url(${el.afterPic})`,
                              filter: "blur(15px)",
                              zIndex: -1,
                            }}
                            _groupHover={{
                              _after: {
                                filter: "blur(20px)",
                              },
                            }}
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
                              <Box w={"100%"} h={"250px"}>
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
                            </Carousel>
                          </Box>
                          <Stack pt={10} align={"center"}>
                            <Text
                              color={"gray.500"}
                              fontSize={"sm"}
                              textTransform={"uppercase"}
                            >
                              {el.bandfProjectType}
                            </Text>
                            <Heading
                              fontSize={"2xl"}
                              fontFamily={"body"}
                              fontWeight={500}
                            >
                              {el.bandfTitle}
                            </Heading>
                            <Flex
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              w={"100%"}
                            >
                              <Box onClick={() => deletePost(el._id)}>
                                <AiOutlineDelete
                                  style={{
                                    fontSize: "30px",
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                />
                              </Box>
                              <Text color={"gray.600"}>
                                {el.updatedAt.substring(0, 10)}
                              </Text>
                            </Flex>
                          </Stack>
                        </Box>
                      </Center>
                    </>
                  ))}
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default AllBeforeAfterImages;
