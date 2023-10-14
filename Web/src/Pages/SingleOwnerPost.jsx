import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SingleOwnerPost() {
    const [data,setData] = useState([]);

    const {id} = useParams();

    const fetchData = async () => {
        fetch(`https://interiorme.onrender.com/ownerpost/getPostOwner/${id}`).then(res => res.json())
        .then(result => {
        //   console.log("jj",result.post)
          setData(result.post)

        })
      };
    
      useEffect(() => {
        fetchData();
      }, []);



  return (
    <>
        <Box display={"flex"} flexDirection={"column"} gap={"20px"} mt={"20px"} mb={"20px"} >
            {
                data?.map((el) => (
                    <Box 
                    bg="white" borderWidth="1px" 
                    w={{base: '100%',md:"80%", lg: '40%'}}
                    h={"590px"}
                    m={"auto"} boxShadow={"2xl"} borderRadius={"10px"}>
                        
                    <Box m={"auto"}  w={"80%"} h={"500px"} display={"flex"} flexDirection={"column"} gap={"20px"} >
                            
                    <Image w={"100%"} h={"100%"} src={el.pics} borderRadius={"20px"}  />        
                            
                    </Box>
                        
                        <Box>
                            <Flex pr={"20px"} color={"grey"} justifyContent={"flex-end"} gap={"5px"} >
                                <Text textDecoration={"underline"} fontStyle={"italic"} >Project Type: </Text>
                                <Text textDecoration={"underline"} fontStyle={"italic"}>{el.projectType}</Text>
                            </Flex>
                            <Flex pr={"20px"} color={"grey"} justifyContent={"flex-end"} gap={"5px"} >
                                <Text fontWeight={"bold"} fontSize={"17px"} fontStyle={"italic"}>Project Title:</Text>
                                <Text fontWeight={"bold"} fontSize={"17px"} fontStyle={"italic"}>{el.title}</Text>
                            </Flex>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    </>
  )
}

export default SingleOwnerPost