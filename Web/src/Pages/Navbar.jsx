import {
  Box,
  HStack,
  Image,
  Text,
  Icon,
  useDisclosure,
  Input,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { TiMessages } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { SiGooglephotos } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
// import "@fontsource/cinzel-decorative";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { BsHammer } from "react-icons/bs";
import { GiHomeGarage } from "react-icons/gi";
import { GiOpenBook } from "react-icons/gi";
import logo from "../assets/homminterior.png"

const Navbar = ({ setSearch, search }) => {
  const options = [
    { name: "PHOTOS", path: "/", icon: <SiGooglephotos /> },
    { name: "PROFESSIONALS", path: "/professionals", icon: <FaUserTie /> },
    { name: "E-BID", path: "/e-bid", icon: <BsHammer /> },
    { name: "FREELANCERS", path: "/freelancers", icon: <GiHomeGarage /> },
    { name: "WISHBOOK", path: "/wishbook", icon: <GiOpenBook /> },
  ];
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("/");
  const token = localStorage.getItem("token");
  const options2 = [
    { name: "Login", path: "/login" },
    { name: "My Orders", path: "/orders" },
    { name: "Profile", path: "/profile" },
  ];
  const productlength = localStorage.getItem("productlength");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let Company_Name = "Company Name";
  const btnRef = React.useRef();

  const handleOptionClick = (path) => {
    setSelectedOption(path);
  };

  const role = localStorage.getItem("role");

  return (
    <>
      <Box
        m="auto"
        w="100%"
        mt="-30px"
        p="14px"
        zIndex="999"
        backgroundColor="inherit"
      >
        <HStack display="flex" mt="30px" w="100%">
          <HStack
            w="100%"
            display={["flex", "flex", "flex", "flex"]}
            flexDirection={["column", "column", "row", "row"]}
            m="auto"
            justifyContent="space-between"
            alignItems={"center"}
            gap="20px"
            textAlign={["left"]}
            pl={{ base: "", lg: "100px" }}
            pr={{ base: "", lg: "100px" }}
          >
            <Box position="relative">
              <Input
                m="auto"
                placeholder="Search by Company Name"
                borderRadius={"27px"}
                w={["300px", "300px", "300px"]}
                h="45px"
                p="15px"
                border="3px solid #ccc"
                value={search}
                bg="white"
                onChange={(e) => setSearch(e.target.value)}
                pr="35px" // Add padding-right to make room for the icon
              />
              <Icon
                as={Search2Icon}
                boxSize={5}
                position="absolute"
                top="50%"
                right="16px"
                transform="translateY(-50%)" // Center the icon vertically
              />
            </Box>

            <Box pl={{ base: "", lg: "100px" }}>
              <Link to="/">
                <Box w={"160px"}>
                <Image
                  mt="5%"
                  mb="2%"
                  w="100%"
                  h="100%"
                  textAlign={"center"}
                  color={"#282828"}
                  fontSize="14.2257px"
                  lineHeight={"39px"}
                  src={logo}
                ></Image>
                </Box>
              </Link>
            </Box>

            {/* <Text position="absolute" top="-2" borderRadius="50%" backgroundColor="grey" textAlign="center" color="white" w="20px" h="20px"  left="40px" transform= "translateX(-50%)" >{productlength}</Text> */}

            {localStorage.getItem("token") == null ? (
              <>
                <Link to="/login-register">
                  <Box
                    display="flex"
                    justifyContent={["flex-start", "flex-start", "center"]} // Adjust justifyContent based on screen size
                    alignItems="center"
                    gap="5px"
                  >
                    <Icon as={FaUser} boxSize={5} />
                    <Text>Sign In</Text>
                  </Box>
                </Link>
                <Link to="/rolelogin">
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    gap="5px"
                    alignItems={"center"}
                  >
                    <Icon as={TiMessages} boxSize={5} />
                    <Text>Join as Business Owner</Text>
                  </Box>
                </Link>
              </>
            ) : (
              <>
                {role == "Customer" ? (
                  <>
                    <Box
                      pr={{ base: "", lg: "170px" }}
                      pl={{ base: "", lg: "160px" }}
                    >
                      <Link to="/userprofile">
                        <Flex
                          alignItems={"center"}
                          p={"5px 10px 5px 10px"}
                          bg={"#e2e8f0"}
                          gap={"5px"}
                          borderRadius={"20px"}
                        >
                          <CgProfile style={{ fontSize: "20px" }} />
                          <Text fontWeight={"bold"}>Profile</Text>
                        </Flex>
                      </Link>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      pr={{ base: "", lg: "140px" }}
                      pl={{ base: "", lg: "130px" }}
                    >
                      <Link to="/owner-account">
                        <Flex
                          alignItems={"center"}
                          p={"5px 10px 5px 10px"}
                          bg={"#e2e8f0"}
                          gap={"5px"}
                          borderRadius={"20px"}
                        >
                          <CgProfile style={{ fontSize: "20px" }} />
                          <Text fontWeight={"bold"}>Owner Profile</Text>
                        </Flex>
                      </Link>
                    </Box>
                  </>
                )}
              </>
            )}
          </HStack>
        </HStack>
        <HStack
          m="auto"
          mt="15px"
          display={["flex", "flex", "flex", "flex"]}
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={["center", "center", "space-evenly"]}
          w="100%"
          gap="20px"
          alignItems={"center"}
        >
          {options?.map((e, i) => (
            <Box
              display={["flex", "flex", "flex", "flex"]}
              flexDirection={["column", "column", "column", "column"]}
              justifyContent={["center", "center", "center"]}
              alignItems="center"
              key={i}
            >
              <Icon w="40px" h="40px">
                {e.icon}
              </Icon>
              <Text
                
                // color={currentRoute==routesArr[i]?"#225886":""}
                // textDecoration={currentRoute==routesArr[i]?"underline":""}
                fontSize={{ md: "16px", lg: "16px" }}
                h="20px"
                // fontFamily={"Montserrat"}
                fontWeight="600"
                lineHeight={"20px"}
                cursor="pointer"
                textAlign={"center"}
                borderBottom={selectedOption === e.path && "2px solid black"}
                onClick={() => handleOptionClick(e.path)}
              >
                <Link to={e.path}>{e.name}</Link>
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default Navbar;
