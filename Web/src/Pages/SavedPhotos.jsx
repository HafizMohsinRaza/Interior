import { Box, Button, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";

function SavedPhotos() {
  const [photos,setPhotos] = useState([]);
  const [loading,setLoading] = useState(false);

  const toast = useToast()

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const ownerId = localStorage.getItem("ownerId");

  const fetchPhotos = () => {
    setLoading(true)
    {
      role == "Customer" ? 
      fetch(`https://interiorme.onrender.com/wishbook/${userId}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setLoading(false)
      setPhotos(result.savedPhotos);
    })
    :
    fetch(`https://interiorme.onrender.com/ownerwishbook/${ownerId}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setLoading(false)
      setPhotos(result.savedPhotos);
    })
    }
  }

  useEffect(() => {
    fetchPhotos()
  },[]);

  const removePhoto = (id) => {
    console.log(id)
    {
      role == "Customer" ? 
      fetch(`https://interiorme.onrender.com/wishbook/photo/${id}`,{
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
        description: "Photo Removed!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      fetchPhotos()
    }) 
    :
    fetch(`https://interiorme.onrender.com/ownerwishbook/photo/${id}`,{
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
        description: "Photo Removed!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      fetchPhotos()
    })
    }
  }



  return (
    <>
      {
        loading ? <Spinner thickness='2px'
        speed='0.65s'
        emptyColor='gray.200'
        color='black.500'
          size='xl' mt={"20px"} mb={"20px"}/> :
        <Box position="relative" overflow="hidden" display={"flex"} flexDirection={"column"} gap={"20px"} p={"20px 0px 20px 0px"}>
          {
            photos?.length == 0 ? 
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
                <Link to='/'>
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
              photos?.map((el,index) => (
                  <Box overflow="hidden"
                    position="relative"
                    bg="white" borderWidth="1px" 
                    w={{base: '100%',md:"80%", lg: '40%'}}
                    h={{base:"",lg:"400px"}}
                    m={"auto"} p={"10px"}
                    key={index} >
                      <Box w={{base:"100%",lg:"60%"}} h={{base:"350px",lg:"80%"}} m={"auto"}>
                        <Image w={"100%"} h={"100%"} src={el.pic[0]}  />
                      </Box>
                      <Flex pt={"40px"} gap={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box background={"lightgrey"} pl={"10px"} pr={"10px"}>
                            <Text fontWeight={"bold"} >{el.companyName}</Text>
                        </Box>
                        <Box>
                          <Box onClick={() => removePhoto(el._id)}>
                            <AiOutlineDelete style={{color:"red",fontSize:"25px",cursor:"pointer"}}/>
                          </Box>
                        </Box>
                      </Flex>
                  </Box>
              ))
          }
            </>
          }
        </Box>
      }
    </>
  )
}

export default SavedPhotos