import React from "react";
import AboutSection from "./AboutSection";
import { Box } from "@chakra-ui/react";
import SwitchButtons from "./SwitchButtons";

function LeftSection({ freelancer }) {
  return (
    <Box>
      <AboutSection freelancer={freelancer} />
      <SwitchButtons freelancer={freelancer} />
    </Box>
  );
}

export default LeftSection;
