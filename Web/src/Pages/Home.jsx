import { Heading, Text, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Filter from "../Components/Filter";
import HomeFirst from "../Components/HomeFirst";
import ProductSection from "../Components/ProductSection";

const Home = ({ search }) => {
  const [data, setData] = useState([]);
  // console.log(search,"home")
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBoxClick = (index, label) => {
    // console.log(label, "label");
    setLoading(true);
    setSelected(index === selected ? null : index);
    // console.log(label)
    fetch(
      `https://interiorme.onrender.com/ownerpost/getPost?projectType=${label}`
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setData(result.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async (Label) => {
    setLoading(true);
    // console.log(Label)
    fetch(`https://interiorme.onrender.com/ownerpost/getPost`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  const searchFetchData = async () => {
    setLoading(true);
    // console.log(search,"search")
    fetch(
      `https://interiorme.onrender.com/ownerpost/search?companyName=${search}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    searchFetchData();
  }, [search]);

  // console.log(data)

  return (
    <Box w="90%" m="auto" paddingTop={"50px"}>
      <Box w="100%" textAlign={"left"}>
        <Heading textAlign={{base:"center",lg:"left"}} fontSize={{base:"",lg:"23px"}} fontWeight={"500"}>
          COLLECTION OF LATEST AND TRENDING DESIGN PHOTOS
        </Heading>
        <Text textAlign={{base:"center",lg:"left"}} fontWeight={"490"} fontSize={{base:"15px",lg:"19px"}} color={"#9eadbb"}>
          Browse From Latest Interior Design Photos, Ideas & Inspiration
        </Text>
      </Box>

      <HomeFirst handleBoxClick={handleBoxClick} />

      <Filter handleBoxClick={handleBoxClick} selected={selected} />

      <ProductSection data={data} productLoading={loading} />
    </Box>
  );
};

export default Home;
