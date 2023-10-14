import {
  Flex,
  Box,
  List,
  ListItem,
  Grid,
  Image,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  GrFacebook,
  GrPinterest,
  GrTwitter,
  GrInstagram,
  GrYoutube,
  GrSnapchat,
} from "react-icons/gr";
import { ImWhatsapp } from "react-icons/im";
import { Link } from "react-router-dom";
import logo from "../assets/homminterior.png";
import { useEffect, useState } from "react";

function Footer() {
  const [data, setData] = useState([]);

  const fetchPosts = async () => {
    fetch("https://interiorme.onrender.com/admin/website")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // console.log("jj",data)
  return (
    <>
      <Box>
        <Box p={["40px 50px 50px 50px"]} w={"100%"} m={"auto"} bg={"white"}>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
            <Text textAlign={"left"} fontWeight={"semibold"}>
              {data?.title}
            </Text>
            <Text textAlign={"left"} fontSize={{ base: "15px" }}>
              {data?.homeSolution}
            </Text>
          </Box>
          <Box mt={"20px"}>
            <Flex
              justifyContent={"space-between"}
              direction={{ base: "column", lg: "row" }}
            >
              <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
                <Text textAlign={"left"} fontWeight={"semibold"}>
                  Contact us to get best deals
                </Text>
                <Text textAlign={"left"} fontWeight={"light"}>
                  {data?.email?.map((email, index) => (
                    <span key={index}>
                      {email}
                      {index !== data.email.length - 1 && (
                        <span style={{ fontWeight: "bolder" }}> or </span>
                      )}
                    </span>
                  ))}
                </Text>
                <Text textAlign={"left"} fontWeight={"light"}>
                  {data?.contact?.map((email, index) => (
                    <span key={index}>
                      {email}
                      {index !== data.email.length - 1 && (
                        <span style={{ fontWeight: "bolder" }}> | </span>
                      )}
                    </span>
                  ))}
                </Text>
                <Text textAlign={"left"} fontWeight={"light"}>
                  {data?.address}
                </Text>
                <Text textAlign={"left"} fontWeight={"semibold"}>
                  Get Latest Blog Alerts
                </Text>
                <Flex>
                  <Input
                    placeholder="Email*"
                    borderRadius={"0px"}
                    border={"1px solid darkgrey"}
                  />
                  <Button
                    borderRadius={"0px"}
                    bg={"#f20505"}
                    color={"white"}
                    fontSize={"13px"}
                    display={"flex"}
                    textAlign={"center"}
                    pb={"1px"}
                  >
                    Submit
                  </Button>
                </Flex>
                <Flex gap={"10px"}>
                  <Button
                    variant={"outline"}
                    border={"1px solid #f20505"}
                    color={"#f20505"}
                  >
                    Submit Email
                  </Button>
                  <Button
                    variant={"outline"}
                    border={"1px solid #0085fc"}
                    color={"#0085fc"}
                  >
                    Register as a Vendor
                  </Button>
                </Flex>
              </Box>
              <Box
                mt={{ base: "20px" }}
                w={"50%"}
                display={"flex"}
                flexDirection={"column"}
                gap={"10px"}
              >
                <Text textAlign={"left"} fontSize={"20px"} fontWeight={"bold"}>
                  Get the Homminterior App
                </Text>
                <Box w={{ base: "60%", lg: "20%" }} cursor={"pointer"}>
                  <Image src="https://cdn.ayroui.com/1.0/images/footer/app-store.svg" />
                </Box>
                <Box w={{ base: "60%", lg: "20%" }} cursor={"pointer"}>
                  <Image src="https://cdn.ayroui.com/1.0/images/footer/play-store.svg" />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box
          bg="grey"
          color="white"
          pt="40px"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Grid
            p={{
              base: "20px 0px 50px 0px",
              md: "20px 50px 20px 50px",
              lg: "20px 50px 50px 150px",
            }}
            rowGap={{ base: "20px", md: "50px", lg: "20px" }}
            templateColumns={[
              "repeat(1, auto)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            <List
              display="flex"
              flexDirection={"column"}
              textAlign={["center", "left", "left", "left"]}
              justifyContent="left"
              lineHeight="26px"
            >
              <Flex mt={"10px"} justifyContent={{ base: "center", lg: "left" }}>
                <Box w={"60%"}>
                  <Image src={logo} />
                </Box>
              </Flex>
              <ListItem mt={"20px"}>Questions of feedback?</ListItem>
              <ListItem>We’d love to hear from you</ListItem>

              <Flex
                gap="20px"
                mt="20px"
                justifyContent={{ base: "center", lg: "left" }}
              >
                <a href={data?.facebookLink}>
                  <GrFacebook
                    className="ficons"
                    style={{ cursor: "pointer", hover: { color: "#ef00b0" } }}
                  />
                </a>
                <a href={data?.twitterLink}>
                  <GrTwitter className="ficons" style={{ cursor: "pointer" }} />
                </a>
                <a href={data?.instagramLink}>
                  <GrInstagram
                    className="ficons"
                    style={{ cursor: "pointer" }}
                  />
                </a>
                <a href={data?.pinterestLink}>
                  <GrPinterest
                    className="ficons"
                    style={{ cursor: "pointer" }}
                  />
                </a>
                <a href={data?.youtubeLink}>
                  <GrYoutube className="ficons" style={{ cursor: "pointer" }} />
                </a>
                <a href={data?.snapchatLink}>
                  <GrSnapchat
                    className="ficons"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </Flex>
            </List>

            <style jsx>{`
              .ficons:hover {
                color: #ef00b0;
              }
            `}</style>

            <List textAlign={["center", "left", "left", "left"]}>
              <ListItem fontWeight={"bold"} fontSize={"20px"} pb={"20px"}>
                USEFUL LINKS
              </ListItem>
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <ListItem
                
                  w={"20%"}
                  
                  m={{base:"auto",lg:"0"}}
                >
                  <Link to="/">
                    <Text className="footerItems">Home</Text>
                  </Link>
                </ListItem>

                <ListItem
                
                  w={"40%"}
                  
                  m={{base:"auto",lg:"0"}}
                >
                  <Link to="/professionals">
                    <Text className="footerItems">Professional</Text>
                  </Link>
                </ListItem>

                <ListItem
                
                  w={"40%"}
                  
                  m={{base:"auto",lg:"0"}}
                >
                  <Link to="/freelancers">
                    <Text className="footerItems">Freelancer</Text>
                  </Link>
                </ListItem>

                <ListItem
                
                  w={"40%"}
                 
                  m={{base:"auto",lg:"0"}}
                >
                  <Link to="/wishbook">
                    <Text  className="footerItems">Wishbook</Text>
                  </Link>
                </ListItem>
              </Box>
            </List>

            <List textAlign={["center", "left", "left", "left"]}>
              <ListItem fontWeight={"bold"} fontSize={"20px"} pb={"20px"}>
                ABOUT
              </ListItem>
              <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
                <ListItem m={{base:"auto",lg:"0"}}
                
                  w={"40%"}
                  
                >
                  <Link to="/aboutUs">
                    <Text className="footerItems">About Us</Text>
                  </Link>
                </ListItem>

                <ListItem m={{base:"auto",lg:"0"}} 
                w={"40%"}>
                  <Link to="/copyRight">
                    <Text className="footerItems">Copyright Policy</Text>
                  </Link>
                </ListItem>

                <ListItem m={{base:"auto",lg:"0"}} 
                w={"50%"}>
                  <Link to="/termsConditions">
                    <Text className="footerItems">Terms & Conditions</Text>
                  </Link>
                </ListItem>

                <ListItem m={{base:"auto",lg:"0"}} 
                w={"40%"}>
                  <Link to="/privacyPolicy">
                    <Text className="footerItems" >Privacy Policy</Text>
                  </Link>
                </ListItem>
              </Box>
            </List>

            <List textAlign={["center", "left", "left", "left"]}>
              <ListItem fontWeight={"bold"} fontSize={"20px"} pb={"20px"}>
                CONTACT US
              </ListItem>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <ListItem>Info@Homminterior.com</ListItem>
                <Link to="/contactUs">
                  <ListItem className="footerItems">more..</ListItem>
                </Link>
              </Box>
            </List>
          </Grid>

          <style jsx>{`
            .footerItems:hover {
              color: #8f006b;
              fontweight: "bold";
            }
          `}</style>

          <Box bg="black" p="10px 0" color={"white"}>
            2023 © All Rights Reserved
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;

{
  /*
<List textAlign={["center", "left", "left", "left"]}>
              <ListItem
                className="footerItems firsti"
                fontWeight={"bold"}
                fontSize={"20px"}
                pb={"20px"}
              >
                CATEGORIES
              </ListItem>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <ListItem className="footerItems">All</ListItem>
                <ListItem className="footerItems">Baby and Kids</ListItem>
                <ListItem className="footerItems">Bath</ListItem>
                <ListItem className="footerItems">Bedroom</ListItem>
                <ListItem className="footerItems">more..</ListItem>
              </Box>
            </List>
*/
}
