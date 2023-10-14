import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-elastic-carousel";

<style>
{`
.rec.rec-arrow {
  border-radius: 0;
}
/* round buttons on hover */
.rec.rec-arrow:hover {
  border-radius: 50%;
}
/* hide disabled buttons */
.rec.rec-arrow:disabled {
  visibility: hidden;
}
`}
</style>

const Carousels = ({ items, handleBoxClick }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 420, itemsToShow: 5 },
    { width: 768, itemsToShow: 6 },
    { width: 1200, itemsToShow: 7 },
  ];


  return (
    <Carousel
      pagination={false}
      breakPoints={breakPoints}
      enableAutoPlay
      autoPlaySpeed={1400}
    >
      {items.map((e, i) => (
        <Box
          mt="40px"
          key={i}
          mb="1%"
          textAlign="center"
          line-spacing="0.05em"
          fontFamily="Montserrat"
          w={{base:"90%",lg:"100%"}}
          borderRadius={"8px"}
          onClick={() => handleBoxClick(e.i, e.title)}
          // border={"1px solid red"}
          display={"flex"}
          flexDirection={"column"}
          pl={"10px"}
          pr={"10px"}
        >
          <Image
            borderRadius="50% 50% 0px 0px"
            src={e.img}
            h="178px"
            w="100%"
            mb="2%"
            cursor={"pointer"}
            border={"2px solid #cccccc"}
            boxShadow={"2xl"}
          ></Image>
          <Text textAlign="center" fontWeight={"600"} fontSize="19px">
            {e.title}
          </Text>
        </Box>
      ))}
    </Carousel>
  );
};

export default Carousels;
