import { Box, Grid, Heading } from "@chakra-ui/react";
import React from "react";

const Filter = ({ handleBoxClick, selected }) => {
  // const [selected, setSelected] = useState(null)

  // const handleBoxClick = (index,label) => {
  //   setSelected(index === selected ? null : index)
  //   console.log(label)
  // }

  return (
    <Box mt="40px" display="flex" justifyContent="center">
      <Box width="100%">
        <Heading textAlign="left" mb="20px">
          Filter
        </Heading>
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(5, 1fr)",
            "repeat(8, 1fr)",
          ]}
          gap="2"
          justifyContent="center"
        >
          {[
            "All",
            "Baby and Kids",
            "Bath",
            "Bedroom",
            "Dining",
            "Exterior",
            "Home Office",
            "Kitchen",
            "Living",
            "Wardrobe",
            "Bathroom",
            "Garden/Landscape",
            "Corridors",
            "Basement",
            "Furnitures",
            "Home Bar",
            "Restaurant",
            "Office",
            "Salon",
            "Gym and Yoga",
            "Shop",
          ].map((label, index) => (
            <Box
              padding="10px"
              fontSize="17px"
              fontWeight={"semibold"}
              key={label}
              bg={selected === index ? "white" : "#EBEBEB"}
              onClick={() => handleBoxClick(index, label)}
              gridColumn={["span 1", index < 2 ? "span 2" : "span 1"]}
              cursor={"pointer"}
            >
              {label}
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Filter;
