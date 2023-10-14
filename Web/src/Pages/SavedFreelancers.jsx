import { Box, Button, Circle, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import Rating from '../Components/Rating';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SavedFreelancerCard from '../Components/SavedFreelancerCard';

function SavedFreelancers() {
  const [freelancer,setFreelancers] = useState([]);
  const [loading,setLoading] = useState(false);

  const toast = useToast();
  const role = localStorage.getItem("role");


  const fetchFreelancers = () => {
    setLoading(true)
    {
      role == "Customer" ? 
      fetch("https://interiorme.onrender.com/wishbook/getfreelancer",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
        }).then(res => res.json())
        .then(result => {
          // console.log(result.myfreelancer)
          setFreelancers(result.myfreelancer)
          setLoading(false)
        })
    :
      fetch("https://interiorme.onrender.com/ownerwishbook/getfreelancer",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
        }).then(res => res.json())
        .then(result => {
          // console.log(result.myfreelancer)
          setFreelancers(result.myfreelancer)
          setLoading(false)
        })
      }
  }

  useEffect(() => {
    fetchFreelancers()
  },[]);

  const removeFreelancer = (id) => {
    // console.log(id)
    fetch(`https://interiorme.onrender.com/wishbook/freelancer/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      toast({
        title: 'Removed.',
        description: result.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      fetchFreelancers()
    })
  }

  // console.log(freelancer,"new")

  return (
    <>
    {
      loading ? <Spinner thickness='2px'
      speed='0.65s'
      emptyColor='gray.200'
      color='black.500'
      size='xl' mt={"20px"} mb={"20px"}/> :
      <Box m={"auto"} w={{base: '100%', lg: '65%'}} display={"flex"} flexDirection={"column"} gap={"20px"} mt={"30px"} mb={"70px"}  >
      <Box>
          <Text fontSize={"30px"} fontWeight={"bold"}>Saved Freelancers</Text>
        </Box>
          {
            freelancer.length == 0 ? 
            <>
            <Box w={"100%"} p={"40px"}>
            <Box w={"40%"} m={"auto"} display={"flex"} flexDirection={"column"} gap={"30px"} p={"100px 20px 100px 20px"}>
              <Box>
                <Text fontSize={"35px"} fontWeight={"extrabold"}>Your wishlist is empty</Text>
              </Box>
              <Box>
                <Text fontSize={"20px"} color={"darkgrey"}>Create Your first wishlist request</Text>
              </Box>
              <Box >
                <Link to='/freelancers'>
                  <Button m={"auto"} display={"flex"} gap={"5px"} alignItems={"center"} borderRadius={'0px'} bg={"#fc2a2a"}>
                    <AiOutlinePlus/>
                    <Text>Create new wish</Text>
                  </Button>
                </Link>
              </Box>
              </Box>
            </Box>
            </>
            :
            <>
            {
              freelancer?.map((el) => (
                <>
                  <SavedFreelancerCard id={el._id} pic={el.pic} companyName={el.companyName} rating={el.rating} address={el.address} city={el.city} country={el.country} reviews={el.reviews} refId={el.refId} />
                </>
              ))
            }
            </>
          }
      </Box>
    }
    </>
  )
}

export default SavedFreelancers