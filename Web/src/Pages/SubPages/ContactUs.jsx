import { Box, Text } from "@chakra-ui/react";
import React from "react";

function ContactUs() {
  return (
    <Box p={"20px 0px 160px 0px"}>
      <Text fontWeight={"bold"} fontSize={"40px"} textTransform={"uppercase"}>
        Contact Us
      </Text>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          For Professionals and Businesses
        </Text>
      </Box>
      <Box w={"70%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"}>
          If you're a registered Professional or a business seeking to showcase
          your expertise or brand on our platform, kindly direct your inquiries
          to info.hmmtechpvtltd@gmail.com
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Marketing Collaborations
        </Text>
      </Box>
      <Box w={"70%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"}>
          For exciting brand collaborations involving sponsored content, dynamic
          social media campaigns, and more, please reach out to us at
          info.hmmtechpvtltd@gmail.com
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Join Our Team
        </Text>
      </Box>
      <Box w={"70%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"}>
          Are you a passionate individual eager to redefine the interior
          landscape? Explore our current openings on our careers page and
          connect with us at info.hmmtechpvtltd@gmail.com
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"}>
          Customer Engagement
        </Text>
      </Box>
      <Box w={"70%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"}>
        We're here for our precious users. Share your feedback or questions with us at info.hmmtechpvtltd@gmail.com . Your input is invaluable in making HommInterior even better for you."
        </Text>
      </Box>
    </Box>
  );
}

export default ContactUs;
