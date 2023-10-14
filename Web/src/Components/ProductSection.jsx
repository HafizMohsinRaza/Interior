import {
  Box,
  Heading,
  Image,
  Stack,
  Grid,
  Text,
  Tooltip,
  Icon,
  Flex,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineShrink } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { BiTime } from "react-icons/bi";
import HeartLike from "./HeartLike";

const ProductSection = ({ data, productLoading }) => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [loading, setLoading] = useState(false);

  const [previewIndex, setPreviewIndex] = useState(null);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 6);
      setLoading(false);
    }, 1000); // simulate loading delay
  };

  const hasMoreProducts = visibleProducts < data?.length;

  const handlePreviewClick = (index) => {
    setPreviewIndex(index);
  };

  // console.log(data)

  return (
    <Box py="12">
      <Box>
        {productLoading ? (
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
            {data?.slice(0, visibleProducts)?.map((el, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                bg="white"
                pt={"0px"}
              >
                {el.pics.map((img, index) => (
                  <Box w={"100%"} h={"250px"} key={index}>
                    <Image
                      transition="all 0.3s"
                      _hover={{ filter: "brightness(1.2)" }}
                      key={index}
                      src={img}
                      alt={el.title}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                    />
                  </Box>
                ))}

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
                    onClick={() => handlePreviewClick(index)}
                    cursor={"pointer"}
                  >
                    <Icon as={AiOutlineShrink} w={6} h={6} color="white" />
                  </Box>
                </Tooltip>

                {previewIndex === index && (
                  <Box
                    position="fixed"
                    top="0"
                    left="0"
                    zIndex="9999"
                    width="100vw"
                    height="100vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="rgba(0, 0, 0, 0.8)"
                    onClick={() => setPreviewIndex(null)}
                  >
                    <Image
                      src={el.pics} // Replace 'img' with the actual image source
                      alt={el.title}
                      maxWidth="80%"
                      maxHeight="80%"
                      objectFit="contain"
                    />
                  </Box>
                )}

                <HeartLike
                  companyName={el?.postedBy?.companyName}
                  pics={el.pics}
                  id={el._id}
                />

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
                      {el.title}
                    </Heading>

                    <Text fontSize={"17px"} fontWeight="500">
                      {el.projectType}
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
        )}
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
  );
};

export default ProductSection;
