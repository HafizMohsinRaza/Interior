import { Avatar, Badge, Box, Button, ButtonGroup, Circle, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Skeleton, SkeletonCircle, SkeletonText, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { BiMessageDetail } from 'react-icons/bi';
import { MdIosShare } from 'react-icons/md';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import Carousel from "react-elastic-carousel";
import axios from 'axios';

function SingleEbid() {
    const [data,setData] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading,setLoading] = useState(true);
    const [commentLoading,setCommentLoading] = useState(false);

    const initialFocusRef = React.useRef()

    const {id} = useParams();
    const toast = useToast()

    const fetchPost = async () => {
        fetch(`https://interiorme.onrender.com/post/get/${id}`,{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        }).then(res => res.json())
        .then(result => {
          console.log("jj",result);
          setLoading(false);
          setData(result)
        })
      };
    
      useEffect(() => {
        fetchPost();
      }, [id]);

      // console.log(data)

      const [images,setImages] = useState([]);
      const [text,setText] = useState("");

      var imageURL = [];

      const handleComment = async() => {
        setCommentLoading(true)
        imageURL = [];
        let count = 0;

        for(let i=0;i<images.length;i++)
        {
          const storageRef = ref(storage,`/files/${images[i].name}`)
          const uploadTask = uploadBytesResumable(storageRef,images[i]);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            },
            (err) => console.log(err),
            async() => {
              await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                imageURL.push(url)
                console.log(imageURL)
                count++

                if(count == images.length)
                {
                  fetch('https://interiorme.onrender.com/post/comment',{
                    method:"put",
                    headers:{
                      "Content-Type":"application/json",
                      "Authorization": "Bearer "+localStorage.getItem("token")
                    },
                    body:JSON.stringify({
                      text:text,
                      commentPics:imageURL,
                      postId:id
                    })
                  }).then(res => res.json())
                  .then(result => {
                    console.log(result)
                    toast({
                      title: 'Comment created !',
                      description: "Your Comment have created.",
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    })
                    fetchPost()
                    setCommentLoading(false)
                  })
                  .catch((err) => {
                    toast({
                      title: 'Comment error',
                      description: err,
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    })
                    setCommentLoading(false)
                  })
                }
              })
            }
          )
        }
      }

      const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 420, itemsToShow: 1 },
        { width: 768, itemsToShow: 1 },
        { width: 1200, itemsToShow: 1 },
      ];
    
      const carouselArrowStyles = {
        position: "absolute",
        top: "45%",
        width: "20px",
        height: "20px",
        fontSize: "33px",
        fontWeight: "700",
        zIndex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    
        color: "grey",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.2s ease-in-out",
        _hover: {
          backgroundColor: "gray.200",
        },
        display: "flex",
        visibility: "visible",
      };

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

      const [isPopoverEnabled, setIsPopoverEnabled] = useState(false);

      const checkPostWhoCanAccessButton = () => {
        // Send a request to the server to check if the user owns the post
        const postId = data?._id; // Use the post ID here
        console.log(postId,"saff")
        axios.get(`https://interiorme.onrender.com/post/${id}/popover`,{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        }).then((response) => {
            // console.log(response)
            // The server responds with a success message
            setIsPopoverEnabled(true);
          })
          .catch((error) => {
            // The server responds with an error message
            // console.log(error);
            setIsPopoverEnabled(false);
          });
      };

      useEffect(() => {
        checkPostWhoCanAccessButton()
      },[id])

      // console.log(isPopoverEnabled,"hhhha")

      const handleContactClick = async(ownerId) => {
        // console.log(ownerId)
        try {
          await axios.put(`https://interiorme.onrender.com/owner/${ownerId}/click`);
          // Perform any other actions after the click is recorded
        } catch (error) {
          console.error('Error recording click:', error);
        }
      }
      

  return (
    <>
    {
      loading ? <>
        <Box w={{base: '100%',md:"80%", lg: '60%'}} m={"auto"} padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <Skeleton>
            <Box mt={"20px"} h={"50vh"} w={"100%"} >

            </Box>
          </Skeleton>
        </Box>
      </> : <>
      <Box display={"flex"} flexDirection={"column"} gap={"10px"} mt={"20px"} p={"20px"} mb={"70px"} >
        <Box p={"20px"} w={{base: '100%',md:"80%", lg: '60%'}} m={"auto"} boxShadow={"2xl"} borderRadius={"10px"}>
        <Box m={"auto"} display={"flex"} flexDirection={"column"} gap={"20px"} >
        <Flex gap={"20px"} >
          <Circle>
            <Avatar border={"2px solid #dcdcdc"} size={{base:"md",lg:"lg"}} name={data?.postedBy?.name} src={data?.postedBy?.pic} />
          </Circle>
          <Flex  alignItems={"center"} gap={"20px"} w={"100%"} justifyContent={"space-between"}  >
            <Flex alignItems={{base:"left",lg:"center"}} direction={{ base: "column",  lg:"row" }} gap={"10px"} >
              <Text fontSize={{base:"13px",lg:"14px"}} fontWeight={"semibold"} textAlign={{base:"left",lg:"left"}} >{data?.postedBy?.name}</Text>
              <Flex  color={"darkgrey"} fontWeight={"bold"} alignItem={"center"} gap={"10px"} fontSize={{base:"10px",lg:"15px"}} direction={{ base: "column",  lg:"row" }} >
                <Text textAlign={"left"} fontSize={"10px"}>{data?.location}</Text>
                <Text textAlign={"left"} fontSize={"10px"} fontWeight={"light"}>{data?.updatedAt?.substring(0,10)}</Text>
              </Flex>
            </Flex>
            <Box display={"flex"} alignItems={"center"} >
              <Badge fontSize={{base:"10px",lg:"14px"}} variant='subtle' colorScheme='green'>
                {data?.projectCategory}
              </Badge>
            </Box>
          </Flex>
        </Flex>

        <Box display={"flex"} justifyContent={"flex-start"} >
          <Text textAlign={"center"} fontSize={{base:"10px",lg:"17px"}} pl={{base:"",lg:"40px"}}>
            {data?.description}
          </Text>
        </Box>

        <Box w={{base: '100%',md:"80%", lg: '100%'}} m={"auto"} >
          <Flex flexWrap={"wrap"} gap={"10px"} m={"auto"} justifyContent={"space-around"} >
            {
                data?.pic?.map((el) => (
                    <>
                      
                        <Box display={"flex"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"} borderRadius={"10px"}  w={{base: '100%',md:"80%", lg: '40%'}} h={{base:300,lg:200}} >
                          <Image w={"100%"} h={"100%"} src={el} borderRadius={"10px"} />
                        </Box>
                      
            
                    </>
                ))
            }
          </Flex>
        </Box>

        <Flex fontWeight={"bold"} p={"10px"} borderBottom={"1px solid grey"} borderTop={"1px solid grey"} justifyContent={"space-between"} w={"90%"} m={"auto"} alignItems={"center"} >
          <Box display={"flex"} alignItems={"center"} onClick={onOpen} cursor={"pointer"} _hover={{color:"#fc2a2a"}} >
            <BiMessageDetail style={{fontSize:"25px"}} />
            <Text fontSize={{base:"10px",lg:"17px"}} pb={"2px"}>{data?.comments?.length} Bids</Text>
          </Box>
          <Box fontSize={{base:"10px",lg:"17px"}}>
            {data?.projectIsFor}
          </Box>
          <Box p={{base:"0px 15px 0px 15px",lg:"0px 25px 0px 25px"}} _hover={{color:"#fc2a2a"}}>
            <MdIosShare style={{fontSize:"25px",cursor:"pointer"}} onClick={() => handleShare(data)} />
          </Box>
        </Flex>

        {
          data?.projectIsFor == localStorage.getItem("role") ? 
          <>
          <Box>
            <Button colorScheme='green' onClick={onOpen}>Comment!</Button>
          </Box>
          </>
          :
          <></>
        }
        </Box>
        </Box>

        {
          data?.comments?.length == 0 ? <><Text>No comments</Text></> 
          :
          <Box border={"2px solid grey"} w={{base: '90%',md:"80%", lg: '60%'}} m={"auto"} p={"20px"} borderRadius={"10px"} display={"flex"} flexDirection={"column"} gap={"20px"} >
            {
                data?.comments?.map((comment,index) => (
                    <Box borderTop={"1px solid lightgrey"} pt={"20px"} >
                    <Flex gap={"10px"} >
                        <Circle>
                            <Avatar border={"2px solid #dc4545"} size={"md"} name={comment?.postedBy?.name} src={comment?.postedBy?.pic} />
                        </Circle>
                        <Box>
                            <Text fontSize={{base:"13px",lg:"18px"}} fontWeight={"semibold"} textAlign={"left"}>Company {index+1}</Text>
                            <Flex  gap={"10px"} alignItem={"center"} >
                            <Text textAlign={"left"} fontSize={{base:"10px",lg:"15px"}} fontWeight={"bold"} color={"grey"}>{comment?.postedBy?.city}</Text>
                            <Text fontSize={{base:"10px",lg:"15px"}} fontWeight={"hairline"} color={"grey"}>{comment?.time?.substring(0,25)}</Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Box p={"20px"} w={{base: '100%',md:"80%", lg: '44%'}} ml={"28px"}>
                            <Box 
                              overflow="hidden"
                              position="relative"
                              bg="white" borderWidth="1px" 
                              w={{base: '100%',md:"80%", lg: '95%'}}
                              m={"auto"}
                            >
                            <Carousel
                              pagination={false}
                              breakPoints={breakPoints}
                              renderArrow={({ type, onClick }) => (
                                <div
                                  onClick={onClick}
                                  style={{
                                    ...carouselArrowStyles,
                                    left: type === "PREV" ? "10px" : "auto",
                                    right: type === "NEXT" ? "10px" : "auto",
                                  }}
                                >
                                    {type === "PREV" ? "<" : ">"}
                                  </div>
                                )}
                              >
                              {
                                comment.commentPics.map((pic) => (
                                  <>
                                  <Box maxWidth={"100%"} h={"250px"} >
                                    <Image w={"100%"} h={"100%"} src={pic} />
                                  </Box>
                                  </>
                                ))
                              }
                              </Carousel>
                            </Box>
                          
                
                    </Box>
                    <Box display={"flex"} justifyContent={"flex-start"} w={"70%"} m={"auto"}>
                        <Text fontSize={{base:"10px",lg:"17px"}} color={"grey"} textAlign={"center"}>{comment?.text}</Text>
                    </Box>
                    <Box w={"70%"} m={"auto"} mt={"20px"} display={"flex"} justifyContent={"flex-start"} >
                        
                        
                        <Popover
                          initialFocusRef={initialFocusRef}
                          placement='bottom'
                          closeOnBlur={false}
                        >
                        <PopoverTrigger>
                          <Button onClick={() => handleContactClick(comment?.postedBy?._id)} isActive={!isPopoverEnabled} w={{base: '80%',md:"80%", lg: '100%'}} fontSize={{base:"7px",lg:"17px"}} background={"#dc4545"} color={"white"} p={"8px"} borderRadius={"15px"}>
                            Contact this professional
                          </Button>
                        </PopoverTrigger>
                        {
                          isPopoverEnabled ? 
                          <>
                          <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                          <PopoverHeader pt={4} fontWeight='bold' border='0'>
                            Contact Informations
                          </PopoverHeader>
                          <PopoverArrow bg='blue.800' />
                          <PopoverCloseButton />
                          <PopoverBody display={"flex"} flexDirection={"column"} gap={"10px"}>
                            <Box>
                              <Text>Company Name - {comment?.postedBy?.companyName}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"}>
                            {
                              comment?.postedBy?.contact?.length == 0 ?
                              <Box w={"100%"}>
                              <Text textAlign={"center"} textDecoration={"underline"}>This Owner Contact is not Available!</Text>
                              </Box>
                              :
                              <>
                              {
                                comment?.postedBy?.contact?.map((el) => (
                                  <>
                                  <a href={`tel:${el}`}>
                                    {el}
                                  </a>
                                  </>
                                ))
                              }
                              </>
                            }
                            </Box>
                          </PopoverBody>
                          <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            pb={4}
                            justifyContent={"center"}
                          >
                            
                            <ButtonGroup size='sm'>
                                {
                                  data.projectIsFor == "Professional"
                                  ?
                                  <>
                                  <Link to={`/professionals/${comment?.postedBy?._id}`}>
                                    <Button bg={"#edf2f7"} color={"black"} ref={initialFocusRef}>Contact This Owner</Button>
                                  </Link>
                                  </>
                                  :
                                  <>
                                  <Link to={`/freelancer/${comment?.postedBy?._id}`}>
                                    <Button bg={"#edf2f7"} color={"black"}>Contact This Owner</Button>
                                  </Link>
                                  </>
                                }
                                
                            </ButtonGroup>
                            
                          </PopoverFooter>
                        </PopoverContent>
                          </>
                          :
                          <>
                          
                          </>
                        }
                      </Popover>
                    </Box>




                    </Box>
                ))
            }
        </Box>
        }
    </Box>


    {
      data?.projectIsFor == localStorage.getItem("role") ?
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comment Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              localStorage.getItem('role') == 'Customer'  ? <><Text>You Cannot Comment on this post</Text></> :
              <>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"} >
              <Input type='text' placeholder='Write something' onChange={(e) => setText(e.target.value)} />
              <Input type='file' multiple onChange={(e) => setImages(e.target.files)} />
              <Button onClick={handleComment} colorScheme='green' isLoading={commentLoading} >Comment!</Button>
              </Box>
              </>
            }
          </ModalBody>

        </ModalContent>
      </Modal>:
      <></>
    }

    
      </>
    }
    </>
  )
}

export default SingleEbid