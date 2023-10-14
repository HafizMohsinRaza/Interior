import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react';
import furniture from "../assets/Furniture.svg" 
import { Link } from 'react-router-dom';

function Wishbook() {
    const role = localStorage.getItem("role");


  return (
    <>
    {
        role == 'Customer'
        ?
        <Box>
        <Box w={{base: '300px', lg: '50%'}} m={"auto"} mt={"50px"} mb={"80px"} pl={{base:"",lg:"60px"}}>
            <Box display={"flex"} flexWrap={"wrap"} gap={"30px"}  >
                <Link to='/savedphotos' >
                <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"}  >
                    <Box w={{base: '100%', lg: '100%'}}>
                        <Image src={furniture} />
                    </Box>
                    <Box p={"20px"} >
                        <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"} >
                            Saved Photos
                        </Text>
                    </Box>
                </Box>
                </Link>
                <Link to='/userebid' >
                    <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                        <Box>
                            <Image src={furniture} />
                        </Box>
                        <Box p={"20px"} >
                            <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                                Your E-Bids
                            </Text>
                        </Box>
                    </Box>
                </Link>
                <Link to='/savedfreelancer' >
                    <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                        <Box>
                            <Image src={furniture} />
                        </Box>
                        <Box p={"20px"} >
                            <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                                Saved Freelancers
                            </Text>
                        </Box>
                    </Box>
                </Link>
                <Link to='/savedprofessional' >
                    <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                        <Box>
                            <Image src={furniture} />
                        </Box>
                        <Box p={"20px"} >
                            <Text fontSize={{base:"9px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                                Saved Professionals
                            </Text>
                        </Box>
                    </Box>
                </Link>
                
            </Box>
        </Box>
    </Box>
    :
    <>
    <Box>
    <Box w={{base: '300px', lg: '50%'}} m={"auto"} mt={"20px"} mb={"20px"}>
    <Box display={"flex"} flexWrap={"wrap"} gap={"30px"}  >
        <Link to='/savedphotos' >
        <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"}  >
            <Box w={{base: '100%', lg: '100%'}}>
                <Image src={furniture} />
            </Box>
            <Box p={"20px"} >
                <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"} >
                    Saved Photos
                </Text>
            </Box>
        </Box>
        </Link>
        <Link to='/ownercommentbids' >
            <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                <Box>
                    <Image src={furniture} />
                </Box>
                <Box p={"20px"} >
                    <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                        Your E-Bids Where you comment!
                    </Text>
                </Box>
            </Box>
        </Link>
        <Link to='/savedfreelancer' >
            <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                <Box>
                    <Image src={furniture} />
                </Box>
                <Box p={"20px"} >
                    <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                        Saved Freelancers
                    </Text>
                </Box>
            </Box>
        </Link>
        <Link to='/savedprofessional' >
            <Box cursor={"pointer"} w={{base: '130px',md:"200px", lg: '300px'}} m={"auto"} boxShadow={"dark-lg"} borderRadius={"10px"} >
                <Box>
                    <Image src={furniture} />
                </Box>
                <Box p={"20px"} >
                    <Text fontSize={{base:"9px",lg:"15px"}} fontWeight={"bold"} color={"#e84d31"}>
                        Saved Professionals
                    </Text>
                </Box>
            </Box>
        </Link>
        
    </Box>
</Box>
    </Box>
    </> 
    }
    </>
  )
}

export default Wishbook