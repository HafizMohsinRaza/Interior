import { Avatar, Badge, Box, Circle, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { BiMessageDetail } from 'react-icons/bi';
import { MdIosShare } from 'react-icons/md';
import { Link } from 'react-router-dom';

function UserEbid() {
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);


  const fetchPosts = async () => {
    setLoading(true)
    fetch("https://interiorme.onrender.com/post/userpost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(result => {
      console.log("jj",result.mypost)
        setLoading(false)
      setPosts(result.mypost)
    })
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleShare = (post) => {
    const shareData = {
      title: "Share Post",
      text: `Check out this post: ${post.description}`,
      url: window.location.href,
    };
  
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for platforms without the Web Share API
      const socialMediaSharingUrls = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${shareData.text}\n${shareData.url}`
        )}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareData.url
        )}`,
        // Add more social media platforms and their sharing URLs as needed
      };
  
      const platform = prompt("Choose a platform to share: whatsapp, facebook");
      const sharingUrl = socialMediaSharingUrls[platform];
  
      if (sharingUrl) {
        window.open(sharingUrl, "_blank");
      } else {
        console.log("Invalid platform selected");
      }
    }
  };


  return (
    <>
    {
        loading ? <Spinner thickness='2px'
        speed='0.65s'
        emptyColor='gray.200'
        color='black.500'
        size='xl' mt={"30px"} mb={"30px"} />
        :
        <>
        <Box mt={"50px"} mb={"80px"} display={"flex"} flexDirection={"column"} gap={"30px"}>
        {
          posts.map((el) => (
              <>
              <Box p={"20px 20px 70px 20px"} w={{base: '100%',md:"80%", lg: '60%'}} h={{base:550,lg:670}} m={"auto"} boxShadow={"base"} borderRadius={"10px"} key={el._id} >
            <Box m={"auto"} display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Link to={`/e-bid/${el._id}`}>
              <Flex gap={"20px"}>
                <Circle>
                  <Avatar border={"2px solid #dcdcdc"} size={{base:"md",lg:"lg"}} name={el?.postedBy?.name} src={el?.postedBy?.pic} />
                </Circle>
                <Flex w={"100%"} direction={{ base: "column",  lg:"row" }} justifyContent={"space-between"}>
                  <Box>
                    <Text fontSize={{base:"13px",lg:"23px"}} fontWeight={"semibold"} textAlign={"left"} >{el?.postedBy?.name}</Text>
                    <Flex color={"darkgrey"} fontWeight={"bold"} direction={{ base: "column",  lg:"row" }} gap={"10px"} fontSize={{base:"10px",lg:"15px"}} >
                      <Text textAlign={"left"} >{el?.location}</Text>
                      <Text textAlign={"left"} >{el?.updatedAt.substring(0,10)}</Text>
                    </Flex>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} pt={"5px"} >
                    <Badge fontSize={{base:"10px",lg:"14px"}} variant='subtle' colorScheme='green'>
                      {el.projectCategory}
                    </Badge>
                  </Box>
                </Flex>
              </Flex>
            </Link>
              
            <Link to={`/e-bid/${el._id}`}>
              <Box pl={"70px"}>
                <Text textAlign={"left"} fontStyle={"italic"}  fontSize={{base:"10px",lg:"17px"}} >
                  {el.description}
                </Text>
              </Box>
            </Link>

              <Link to={`/e-bid/${el._id}`}>
                <Box w={{base: '100%',md:"80%", lg: '64%'}} h={{base:300,lg:400}} m={"auto"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}>
                  <Image w={"100%"} h={"100%"} src={el?.pic[0]} />
                </Box>
              </Link>
              

              <Flex fontWeight={"bold"} borderTop={"1px solid grey"} borderBottom={"1px solid grey"} justifyContent={"space-between"} w={"95%"} m={"auto"} pt={"10px"} pb={"10px"} mt={"20px"} >
                <Box display={"flex"} alignItems={"center"} gap={"5px"} pl={{base:"",lg:"10px"}} cursor={"pointer"} _hover={{color:"#fc2a2a"}}>
                  <BiMessageDetail style={{fontSize:"25px"}} />
                  <Text fontSize={{base:"10px",lg:"17px"}}>{el.comments.length} Bids</Text>
                </Box>
                <Box fontSize={{base:"10px",lg:"17px"}} display={"flex"} alignItems={"center"}>
                  {el.projectIsFor}
                </Box>
                <Box p={{base:"0px 15px 0px 15px",lg:"0px 30px 0px 30px"}} _hover={{color:"#fc2a2a"}}>
                  <MdIosShare style={{fontSize:"25px",cursor:"pointer"}} onClick={() => handleShare(el)} />
                </Box>
              </Flex>
            </Box>
          </Box>
              </>
          ))
      }
        </Box>
        </>
    }
    </>
  )
}

export default UserEbid