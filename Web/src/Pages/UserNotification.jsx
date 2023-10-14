import { Box, Circle, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { ImHammer2 } from 'react-icons/im';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function UserNotification() {

    const [posts, setPosts] = useState([]);


    const fetchPosts = async () => {
      fetch("https://interiorme.onrender.com/post/userpost",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }).then(res => res.json())
      .then(result => {
        // console.log("jj",result.mypost)
        setPosts(result.mypost)
      })
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);

    const role = posts[0]?.comments[0]?.postedBy?.role;

    console.log(role)


  return (
    <>
    <Box>
        <Box w={{base: '100%', lg: '40%'}} m={"auto"} background={"#edf2f7"} pt={"20px"} >
            <Flex gap={"20px"} alignItems={"center"} p={"10px 20px 30px 20px"} >
                <Link to='/userprofile' >
                <Circle boxShadow={"dark-lg"} p={"5px"} cursor={"pointer"} >
                    <BsArrowLeftShort style={{fontSize:"30px"}} />
                </Circle>
                </Link>
                <Text fontSize={"20px"} fontWeight={"bold"} color={"#282c34"} >Notifications</Text>
            </Flex>
            <Box borderTop={"3px solid lightgrey"} >
                {
                    posts.map((el) => (
                        <>
                        <Flex alignItems={"center"} p={"10px"} borderBottom={"1px solid lightgrey"} >
                            <Box p={"10px"} >
                                <ImHammer2 style={{fontSize:"20px"}} />
                            </Box>
                            <Text fontWeight={"semibold"} fontSize={"15px"} textAlign={"left"} >
                                {el.projectIsFor} have started bidding on your post titled {el.description}. 
                            </Text>
                            <Box p={"10px"} >
                                <BsThreeDotsVertical style={{fontSize:"20px"}} />
                            </Box>
                        </Flex>
                        </>
                    ))
                }
            </Box>
        </Box>
    </Box>
    </>
  )
}

export default UserNotification