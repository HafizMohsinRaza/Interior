import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import ProfessionHeartLike from "./ProfessionHeartLike";

function ProfessionalCard({
  name,
  email,
  id,
  pic,
  companyName,
  address,
  city,
  country,
  reviews,
  services,
  contact,
}) {
  const toast = useToast();

  const ratings = reviews.map((review) => review.rating);

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const averageRating = (sum / ratings?.length).toFixed(1);
  const [isSaved, setIsSaved] = React.useState(false);
  const savedProfessional = (
    name,
    email,
    pic,
    companyName,
    address,
    city,
    country,
    reviews
  ) => {
    console.log(city, country, reviews.length);

    fetch("https://interiorme.onrender.com/wishbook/professional", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        pic: pic,
        companyName: companyName,
        address: address,
        city: city,
        country: country,
        rating: reviews.length,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "new data");
        setIsSaved(true);
        if (data.msg) {
          toast({
            title: "Add to Wishbook.",
            description: data.msg,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Add to Wishbook.",
            description: data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      w={{ base: "100%", md: "50%", lg: "100%" }}
      background={"white"}
      display={"flex"}
      gap={"20px"}
      p={"25px"}
      h={{base:"250px",lg:"310px"}}
      key={id}
      
    >
      <Box w={{ base: "40%", lg: "45%" }} >
        <Image w={"100%"} h={"100%"}  src={pic} />
      </Box>

      <Box
        w={{ base: "70%", md: "50%", lg: "100%" }}
        display={"flex"}
        flexDirection={"column"}
        gap={{base:"",lg:"15px"}}
        h={"auto"}
        
      >
        <Flex>
          <Link to={`/professionals/${id}`}>
            <Text
              fontWeight={"medium"}
              _hover={{ color: "red", cursor: "pointer" }}
              fontSize={{ base: "10px", lg: "20px" }}
              textAlign={"left"}
            >
              {companyName}
            </Text>
          </Link>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          fontSize={{ base: "8px", lg: "15px" }}
          gap={"10px"}
          pr={"5px"}
          
        >
          {reviews.length == 0 ? (
            <>
              <Box display={"flex"} alignItems={"center"} >
                <Text color={"lightgrey"}>Their is no Review</Text>
              </Box>
            </>
          ) : (
            <Flex gap={"10px"} alignItems={"center"} >
              {averageRating} <Rating value={averageRating} />
              <Text
                fontSize={{ base: "8px", lg: "15px" }}
                fontWeight={"semibold"}
                color={"grey"}
              >
                {reviews.length} Reviews
              </Text>
            </Flex>
          )}
          <ProfessionHeartLike
            name={name}
            email={email}
            pic={pic}
            companyName={companyName}
            address={address}
            city={city}
            country={country}
            rating={reviews.length}
            id={id}
            contact={contact}
            reviews={reviews}
          />
        </Flex>
        <Text
          textAlign={"left"}
          fontSize={{ base: "8px", lg: "15px" }}
          display={"flex"}
          fontWeight={"semibold"}
          alignItems={"center"}
          color={"#979292"}
          gap={"5px"}
        >
          {" "}
          {address || city || country ? (
            `${address || ""} ${city || ""} ${country || ""}`
          ) : (
            "Their is no location"
          )}
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} >
          <Text fontSize={{base:"8px",lg:"15px"}}>
            {services.join(",").substring(0, 50)} {"..."}
          </Text>
          <Flex alignItems={"center"} gap={"10px"}>
            

            {/* <Circle fontSize={{base:"13px",lg:"20px"}} border={"2px solid grey"} p={{base:"10px",lg:"10px"}} >
                      <BsFillTelephoneFill style={{fontSize:"25px",color:"green"}} />
                  </Circle> */}
            <Menu>
              <MenuButton>
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Box>
                      <Text
                        fontSize={{ base: "0px", lg: "15px" }}
                        fontWeight={"semibold"}
                      >
                      View Number {">"}
                      </Text>
                    </Box>
                    <Box>
                    <Circle
                      fontSize={{ base: "13px", lg: "20px" }}
                      border={"2px solid grey"}
                      p={{ base: "10px", lg: "10px" }}
                      >
                      <BsFillTelephoneFill
                        style={{ fontSize: "25px", color: "green" }}
                      />
                    </Circle>
                    </Box>
                  </Flex>
              </MenuButton>
              {contact.length == 0 ? <MenuList><Text fontWeight={"bold"} color={"red"}>Number Not Found!</Text></MenuList> : 
              <MenuList>{contact[0] + "/" + contact[1]}</MenuList>}
            </Menu>
          </Flex>
        </Flex>
        <Flex
          mt={{base:"",lg:"0px"}}
          p={"10px"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <Button
            fontSize={{ base: "13px", lg: "15px" }}
            border={"1px solid red"}
            color={"red"}
            variant={"outline"}
            p={{ base: "8px", lg: "5px 65px 5px 65px" }}
            borderRadius={"20px"}
          >
            Send Message
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfessionalCard;
