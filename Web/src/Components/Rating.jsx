import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

const Rating = ({ value }) => {
  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <StarIcon
          key={rating}
          color={rating <= value ? "yellow.500" : "gray.300"}
        />
      ))}
    </HStack>
  );
};

export default Rating;
