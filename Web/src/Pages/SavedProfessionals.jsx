import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import SavedProfessionalCard from '../Components/SavedProfessionalCard';

function SavedProfessionals() {

  const [professional,setProfessionals] = useState([]);
  const [loading,setLoading] = useState(false);

  const role = localStorage.getItem("role")

  const fetchProfessional = () => {
    setLoading(true)
    {
      role == "Customer" ? 
      fetch("https://interiorme.onrender.com/wishbook/getprof",{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        }).then(res => res.json())
        .then(result => {
          console.log(result.myprof)
          setProfessionals(result.myprof)
          setLoading(false)
          // setPhotos(result.myphotos);
        })
    :
    fetch("https://interiorme.onrender.com/ownerwishbook/getprof",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }).then(res => res.json())
      .then(result => {
        console.log(result.myprof)
        setProfessionals(result.myprof)
        setLoading(false)
        // setPhotos(result.myphotos);
      })
    }
  }

  useEffect(() => {
    fetchProfessional()
  },[]);

   


  return (
    <>
    {
      loading ? <Spinner thickness='2px'
      speed='0.65s'
      emptyColor='gray.200'
      color='black.500'
      size='xl' mt={"20px"} mb={"20px"} /> :
      <Box m={"auto"} w={{base: '100%', lg: '65%'}} display={"flex"} flexDirection={"column"} gap={"20px"} mt={"30px"} mb={"70px"} >
        <Box>
          <Text fontSize={"30px"} fontWeight={"bold"}>Saved Professionals</Text>
        </Box>
        {
          professional?.length == 0 ? <>
          <Box w={"100%"} p={"40px"}>
            <Box w={"40%"} m={"auto"} display={"flex"} flexDirection={"column"} gap={"30px"} p={"100px 20px 100px 20px"}>
              <Box>
                <Text fontSize={"35px"} fontWeight={"extrabold"}>Your wishlist is empty</Text>
              </Box>
              <Box>
                <Text fontSize={"20px"} color={"darkgrey"}>Create Your first wishlist request</Text>
              </Box>
              <Box >
                <Link to='/professionals'>
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
            professional?.map((el) => (
              <>
                <SavedProfessionalCard pic={el.pic} companyName={el.companyName} rating={el.rating} address={el.address} city={el.city} country={el.country} reviews={el.reviews} refId={el.refId} />
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

export default SavedProfessionals