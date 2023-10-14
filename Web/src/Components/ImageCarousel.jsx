import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const ImageCarousel = ({ items }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    { width: 420, itemsToShow: 5 },
    { width: 768, itemsToShow: 8 },
    { width: 1200, itemsToShow: 9 },
  ];

  return (
    <Carousel pagination={false} breakPoints={breakPoints}>
      {items.map((e, i) => (
        <Link to={`/singleproduct`}>
          <Box
            mt="40px"
            key={i}
            mb="1%"
            textAlign="center"
            line-spacing="0.05em"
            fontFamily="Montserrat"
            w="100%"
            borderRadius={"8px"}
          >
            <Image
              borderRadius="50% 50% 0px 0px"
              src={e.img}
              h="198px"
              w="90%"
              mb="2%"
            ></Image>
            <Text textAlign="center" fontWeight={"600"} fontSize="21px">
              {e.title}
            </Text>
          </Box>
        </Link>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
