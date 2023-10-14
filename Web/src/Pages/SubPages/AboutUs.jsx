import { Box, Text } from "@chakra-ui/react";
import React from "react";

function AboutUs() {
  return (
    <Box p={"20px 0px 160px 0px"}>
      <Text fontWeight={"bold"} fontSize={"40px"} textTransform={"uppercase"}>
        About
      </Text>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>
          Welcome to Homminterior - Where Your Dreams Come to Life!
        </Text>
      </Box>
      <Box w={"70%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"} mt={"20px"}>
          At HommInterior, our mission revolves around providing an exceptional
          online platform and marketplace, delivering invaluable interior
          information to property owners across the globe. With an unwavering
          commitment to excellence, we have set out to revolutionize the
          interior industry by simplifying the process for property owners,
          interior enthusiasts, freelancers, and service providers alike
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>
          Why Choose HommInterior?
        </Text>
      </Box>
      <Box w={"60%"} m={"auto"}>
        <Text fontWeight={"light"} lineHeight={"30px"} letterSpacing={"2px"} mt={"20px"}>
          We are your trusted partner in transforming interior dreams into
          reality. Our comprehensive range of services, accessible through the
          homminterior.com website and user-friendly mobile application, opens
          up a world of interior possibilities tailored to your preferences and
          needs.
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>
          Discover Limitless Interior Inspiration:
        </Text>
      </Box>
      <Box w={{base:"80%",lg:"50%"}} m={"auto"}>
        <Text
          mt={"20px"}
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
        >
          <span style={{ fontWeight: "bold" }}>Interior Ideas:</span> Dive into
          a vast collection of interior ideas curated for every project. From
          residential spaces to commercial properties, we've got thousands of
          inspirational ideas to fuel your creative journey.
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>
            Connect with Professionals:
          </span>{" "}
          HommInterior connects you with a network of skilled interior
          architects, designers, freelancers, and service providers who are
          passionate about making your vision come to life.
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>
            Interior Architects & Designers:
          </span>
          Explore our listing services to discover interior architects and
          designers aligned with your project requirements. Collaborate with
          experts who bring innovation and creativity to your space.
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>Freelancers:</span>Connect with
          freelance professionals who offer specialized skills such as
          carpentry, plumbing, electrical work, and more. Find economical and
          instant solutions for your specific needs.
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>
          Effortless Project Posting:
        </Text>
      </Box>
      <Box w={"60%"} m={"auto"}>
        <Text
          fontWeight={"light"}
          lineHeight={"30px"}
          letterSpacing={"2px"}
          mt={"20px"}
        >
          Post Your Interior Project: Experience the convenience of posting your
          interior project for free and witness professionals and freelancers
          bidding for your work.
        </Text>
      </Box>
      <Box w={{base:"80%",lg:"50%"}} m={"auto"}>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"20px"}
        >
          <span style={{ fontWeight: "bold" }}>
            Quality-Driven Professionals:
          </span>
          Choose from a selection of experts who are excited to offer their
          quality-driven services. From intricate carpentry to plumbing and
          electricals, connect with skilled service providers who ensure
          exceptional results.
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>Economical:</span>Opt for
          freelancers who provide economical and instant solutions. Whether
          you're seeking quick fixes or specific services, our network of
          freelancers has got you covered.
        </Text>
      </Box>
      <Box mt={"20px"}>
        <Text fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>
          Your Interior Journey Starts Here:
        </Text>
      </Box>
      <Box w={{base:"80%",lg:"50%"}} m={"auto"}>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"20px"}
        >
          <span style={{ fontWeight: "bold" }}>Innovative Solutions:</span>
          We're here to redefine the interior landscape by introducing
          innovative solutions that cater to your unique needs. HommInterior's
          commitment to excellence changes the game in the interior industry.
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>Simplified Process:</span>
          Navigating the world of interiors has never been easier. With our
          intuitive platform, users can seamlessly explore interior ideas,
          connect with professionals, and make informed decisions for their
          projects, all in one place
        </Text>
        <Text
          fontWeight={"light"}
          textAlign={"left"}
          letterSpacing={"2px"}
          mt={"10px"}
        >
          <span style={{ fontWeight: "bold" }}>Empowerment:</span>We empower
          property owners to take charge of their interior projects by offering
          a user-centric approach that puts their preferences and requirements
          at the forefront.
        </Text>
      </Box>
      <Box w={{base:"80%",lg:"60%"}} m={"auto"}>
        <Text fontWeight={"light"}
        textAlign={"left"}
        letterSpacing={"2px"}
        mt={"40px"}>
          At <span style={{ fontWeight: "bold" }}>HommInterior,</span>we are
          more than just a marketplace; we are a community of like-minded
          individuals passionate about creating stunning interiors that reflect
          your vision and style. Join us on this transformative journey as we
          pave the way for accessible, inspiring, and seamless interior
          experiences.
        </Text>
      </Box>
    </Box>
  );
}

export default AboutUs;
