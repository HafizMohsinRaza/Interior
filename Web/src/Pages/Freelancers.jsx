import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FreelancerCard from "../Components/FreelancerCard";

function Freelancers() {
  const [freelancer, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFreelancers = () => {
    fetch("https://interiorme.onrender.com/owner/allOwner")
      .then((res) => res.json())
      .then((result) => {
        const filter = result.Owner.filter((word) => word.role == "Freelancer");
        console.log(filter, "filter");
        setLoading(false);
        setFreelancers(filter);
      });
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black.500"
          size="xl"
          mt={"30px"}
          mb={"30px"}
        />
      ) : (
        <Box background={"#f7f8f9"}>
          <Box m={"auto"} w={{ base: "100%", lg: "75%" }}>
            <Box>
              <Heading fontSize={"30px"} textAlign={"left"}>
                Freelancers
              </Heading>
            </Box>
            <Flex
              w={{ base: "100%", lg: "100%" }}
              gap={"40px"}
              py={"30px"}
              direction={{ base: "column-reverse", lg: "row" }}
            >
              <Box
                m={"auto"}
                w={{ base: "100%", lg: "85%" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                {freelancer?.reverse()?.map((el,index) => (
                  <FreelancerCard
                    
                    name={el.name}
                    email={el.email}
                    id={el._id}
                    pic={el.pic}
                    companyName={el.companyName}
                    address={el.address}
                    city={el.city}
                    country={el.country}
                    reviews={el.reviews}
                    services={el.services}
                  />
                ))}
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Freelancers;
