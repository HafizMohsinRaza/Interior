import { Avatar, AvatarBadge, Box, Button, Circle, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { AiTwotoneCamera } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { storage } from '../firebase';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { LogoutButton } from '../oAuth/OAuth.config';

function UserProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [pic,setPic] = useState("");
    const [loading,setLoading] = useState(false);


    const [image,setImage] = useState([]);

    const auth = useContext(AppContext);

    const fetchUser = () => {
        fetch('https://interiorme.onrender.com/user/getprofile',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            setEmail(result.email)
            setMobile(result.phone)
            setName(result.name)
            setPic(result.pic)
        })
    }

    useEffect(() => {
        fetchUser()
    },[])

    const toast = useToast()

    const handleProfilePic = () => {
        console.log("sahil")
        let count = 0;
        for(let i=0;i<image.length;i++)
        {
            const storageRef = ref(storage,`/files/${image[i].name}`)
            const uploadTask = uploadBytesResumable(storageRef,image[i]);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(percent)
                },
                (err) => console.log(err),
                async() => {

                    await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url)
                        count++
                        
                        if(count == image.length)
                        {
                            fetch('https://interiorme.onrender.com/user/profile',{
                                method:"post",
                                headers:{
                                    "Content-Type":"application/json",
                                    Authorization:"Bearer "+localStorage.getItem("token")
                                },
                                body:JSON.stringify({
                                    pic:url,
                                    name:name,
                                    email:email,
                                    phone:mobile
                                })
                            }).then(res => res.json())
                            .then(data => {
                                console.log(data)
                                
                                toast({
                                    title: 'Update Profile!',
                                    description: "Your Profile Picture is updated now!",
                                    status: 'success',
                                    duration: 4000,
                                    isClosable: true,
                                  })
                                fetchUser()
                            })
                            .catch((error) => {
                                console.log(error)
                                toast({
                                    title: 'Update Error!',
                                    description: error,
                                    status: 'error',
                                    duration: 4000,
                                    isClosable: true,
                                  })
                            })
                        }
                    })
                }
            )
        }
    }

    useEffect(() => {
        handleProfilePic()
    },[image])

    const handleUpdate = (e) => {
        setLoading(true)
        e.preventDefault();
        setLoading(true)
        // if(image.length == 0)
        // {
        //     return toast({
        //         title: 'Update error.',
        //         description: "Please select attleast 1 photo to update your profile.",
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //       })
        // }
        fetch('https://interiorme.onrender.com/user/profile',{
                                method:"post",
                                headers:{
                                    "Content-Type":"application/json",
                                    Authorization:"Bearer "+localStorage.getItem("token")
                                },
                                body:JSON.stringify({
                                    name:name,
                                    email:email,
                                    phone:mobile
                                })
                            }).then(res => res.json())
                            .then(data => {
                                console.log(data)
                                setLoading(false)
                                toast({
                                    title: 'Update Profile!',
                                    description: "Your Profile is updated now!",
                                    status: 'success',
                                    duration: 4000,
                                    isClosable: true,
                                  })

                                fetchUser()
                            })
                            .catch((error) => {
                                console.log(error)
                                setLoading(false)
                                toast({
                                    title: 'Update Error!',
                                    description: error,
                                    status: 'error',
                                    duration: 4000,
                                    isClosable: true,
                                  })
                            })
    }

    const handleLogout = () => {
        auth.handleLogout()
        localStorage.clear()
        // window.location.reload()
    }


  return (
    <>
    <Box p={"50px 0px 50px 0px"}>
        <Box w={{base: '100%', lg: '40%'}} m={"auto"} background={"#edf2f7"} pt={"20px"} >
            <Text fontSize={"20px"} fontWeight={"bold"} color={"#282c34"} >Profile</Text>
            <Box mt={"30px"} >
                <Circle>
                    <Avatar src={pic} size='2xl' position={"relative"} />
                    <label htmlFor='fileInput' >
                        <AiTwotoneCamera style={{position:"absolute",right:"700px",bottom:"1360px",fontSize:"30px",color:"#d9d9d9",cursor:"pointer"}} />
                    </label>
                    <input onChange={(e) => setImage(e.target.files)} type='file' id='fileInput' style={{display:"none"}} />
                </Circle>
            </Box>
            <Flex gap={"10px"} pl={"35px"} pt={"10px"} alignItems={"center"} justifyContent={"center"} w={"50%"} m={"auto"} >
                <Text fontSize={"20px"} textAlign={"center"} fontWeight={"semibold"} >{name}</Text>
                <MdModeEditOutline style={{fontSize:"20px",cursor:"pointer"}} onClick={onOpen} />
            </Flex>
            <Box mt={"30px"} background={"white"} >
                <Flex justifyContent={"space-between"} borderBottom={"1px solid lightgrey"} display={"flex"} alignItems={"center"} p={"18px"} >
                    <Box>
                        <Text textAlign={"start"} fontSize={"15px"} fontWeight={"semibold"} >Set Email</Text>
                    </Box>
                    <Box>
                        <Input value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}  />
                    </Box>
                </Flex>
                <Flex justifyContent={"space-between"} borderBottom={"1px solid lightgrey"} display={"flex"} alignItems={"center"} p={"18px"}>
                    <Box>
                        <Text textAlign={"start"} fontSize={"15px"} fontWeight={"semibold"} >Set Mobile Number</Text>
                    </Box>
                    <Box>
                        <Input value={mobile} placeholder='Enter Mobile Number' onChange={(e) => setMobile(e.target.value)}  />
                    </Box>
                </Flex>
                
                <Flex borderBottom={"1px solid lightgrey"} display={"flex"} alignItems={"center"} p={"18px"}>
                    <Link to='/notification' >
                        <Text textAlign={"start"} fontSize={"15px"} fontWeight={"semibold"} cursor={"pointer"}>Notifications</Text>
                    </Link>
                </Flex>
                
                <Flex borderBottom={"1px solid lightgrey"} display={"flex"} alignItems={"center"} p={"18px"}>
                    <LogoutButton onLogout={handleLogout} />
                </Flex>
                <Flex borderBottom={"1px solid lightgrey"} display={"flex"} alignItems={"center"} p={"18px"}>
                    <Text textAlign={"start"} fontSize={"15px"} fontWeight={"semibold"} color={"red"} cursor={"pointer"}>Delete my account</Text>
                </Flex>
            </Box>
            <Box p={"20px"} onClick={handleUpdate} >
                <Button colorScheme='blue' isLoading={loading} >Update</Button>
            </Box>
        </Box>
    </Box>




    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
            <Box display={"flex"} justifyContent={"center"} p={"20px"} >
                <Button onClick={onClose} >Done</Button>
            </Box>
          </ModalBody>

    
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserProfile