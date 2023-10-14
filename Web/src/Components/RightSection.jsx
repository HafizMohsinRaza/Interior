import { Box } from "@chakra-ui/react";
import React from "react";
import Contact from "./Contact";

function RightSection({ freelancer }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <Contact freelancer={freelancer} />
    </Box>
  );
}

export default RightSection;
