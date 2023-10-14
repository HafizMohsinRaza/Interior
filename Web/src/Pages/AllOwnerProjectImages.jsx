import { Box, Center, Flex, Heading, Image, Spinner, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";

function AllOwnerProjectImages() {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false)

    const toast = useToast()
    const bg = useColorModeValue('white', 'gray.800')
    const fetchData = () => {
        setLoading(true)
        fetch("https://interiorme.onrender.com/ownerpost/getAllOwnerPost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
            }).then(res => res.json())
            .then(result => {
                // console.log(result.mypost)
                setLoading(false)
                setData(result.mypost)
                
            })
    }

    

    const deletePost = (id) => {
        
        console.log(id)
        fetch(`https://interiorme.onrender.com/ownerpost/deleteOwnerPost/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            setLoading(false)
            toast({
                title: 'Removed.',
                description: result.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              fetchData()
        })
        
    }

    useEffect(() => {
        fetchData()
    },[])


  return (
    <>
    <Box w={"100%"} h={"auto"}>
        <Box>
            <Heading>All Images Posts</Heading>
        </Box>
        {
            loading ? <Spinner thickness='2px'
            speed='0.65s'
            emptyColor='gray.200'
            color='black.500'
            size='xl' mt={"30px"} mb={"30px"} /> :
            <>
            <Box>
                {
                    data.length == 0 ?
                    <>
                        <Box p={"30px"}>
                            <Text>Their is no any Posts!</Text>
                        </Box>
                    </>
                    :
                    <>
                    {
                        data.map((el,index) => (
                            <>
                            <Center py={12}>
                            <Box
                                role={'group'}
                                p={6}
                                maxW={'330px'}
                                w={'full'}
                                bg={bg}
                                boxShadow={'2xl'}
                                rounded={'lg'}
                                pos={'relative'}
                                zIndex={1}>
                                <Box
                                rounded={'lg'}
                                mt={-12}
                                pos={'relative'}
                                height={'230px'}
                                _after={{
                                    transition: 'all .3s ease',
                                    content: '""',
                                    w: 'full',
                                    h: 'full',
                                    pos: 'absolute',
                                    top: 5,
                                    left: 0,
                                    backgroundImage: `url(${el.pics[0]})`,
                                    filter: 'blur(15px)',
                                    zIndex: -1,
                                }}
                                _groupHover={{
                                    _after: {
                                    filter: 'blur(20px)',
                                    },
                                }}>
                                <Image
                                    rounded={'lg'}
                                    height={250}
                                    width={282}
                                    objectFit={'cover'}
                                    src={el.pics[0]}
                                />
                                </Box>
                                <Stack pt={10} align={'center'}>
                                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                    {el.projectType}
                                </Text>
                                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                    {el.title}
                                </Heading>
                                <Flex direction={'row'} alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
                                    <Box onClick={() => deletePost(el._id)}>
                                        <AiOutlineDelete style={{fontSize:"30px",cursor:"pointer",color:"red"}} />
                                    </Box>
                                    <Text color={'gray.600'}>
                                        {el.updatedAt.substring(0,10)}
                                    </Text>
                                </Flex>
                                </Stack>
                            </Box>
                            </Center>
                            </>
                        ))
                    }
                    </>
                }
            </Box>
            </>
        }
    </Box>
    </>
  )
}

export default AllOwnerProjectImages