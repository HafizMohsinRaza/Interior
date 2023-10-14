import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
  Box,
  Flex,
  Circle,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import sharp from 'sharp';
import Resizer from 'react-image-file-resizer';

function PostEbid() {
  const [description, setDescription] = useState("");
  const [projectIsFor, setProjectIsFor] = useState("");
  const [projectCategory, setprojectCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageURLs, setImageURLs] = useState([]);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const toast = useToast();


  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      async(position) => {
        const { latitude, longitude } = position.coords;
        // setLocation(`${latitude} ${longitude}`);
        try {
          const apiKey = 'AIzaSyAQvoprr3Cs_J2L16uEmkPBcGS1un31DJM';
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
  
          if (response.data.status === 'OK' && response.data.results.length > 0) {
            const formattedAddress = response.data.results[0].formatted_address;
            // Set the formatted address in the state or wherever you want to display it
            // For example, setFormattedAddress(formattedAddress);
            console.log(formattedAddress)
            setLocation(formattedAddress)
          }
        } catch (error) {
          console.error('Error fetching location data from Google Maps API:', error);
        }

      },
      (error) => {
        console.error("Error while fetching location:", error);
      }
    );
  };

  // const handlePostClick = async () => {
  //   setLoading(true);
  //   if (description.length <= 5) {
  //     return toast({
  //       title: "Description error.",
  //       description: "Please fill attleast 5 letter long Description.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  //   if (images.length == 0) {
  //     return toast({
  //       title: "Image error.",
  //       description: "Please select attleast 1 photo.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  //   if (projectIsFor.length == 0) {
  //     return toast({
  //       title: "Project Is for error.",
  //       description: "Please select attleast 1 Project selection.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  //   if (projectCategory.length == 0) {
  //     return toast({
  //       title: "Project Category error.",
  //       description: "Please select attleast 1 Project Category.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  //   if (location.length == 0) {
  //     return toast({
  //       title: "Location error.",
  //       description: "Please select your location.",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }

  //   imageURL = [];
  //   let count = 0;

  //   for (let i = 0; i < images.length; i++) {
  //     const storageRef = ref(storage, `/files/${images[i].name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, images[i]);

      
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const percent = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //       },
  //       (err) => console.log(err),
  //       async () => {
  //         await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           imageURL.push(url);
  //           console.log(imageURL);
  //           count++;

  //           if (count == images.length) {
  //             fetch("https://interiorme.onrender.com/post", {
  //               method: "post",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: "Bearer " + localStorage.getItem("token"),
  //               },
  //               body: JSON.stringify({
  //                 pic: imageURL,
  //                 description,
  //                 location,
  //                 projectCategory,
  //                 projectIsFor,
  //               }),
  //             })
  //               .then((res) => res.json())
  //               .then((data) => {
  //                 // console.log(data, "new data");
  //                 toast({
  //                   title: "Post created !",
  //                   description: "Your project is created now.",
  //                   status: "success",
  //                   duration: 4000,
  //                   isClosable: true,
  //                 });
  //                 setLoading(false);
  //                 navigate("/e-bid");
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //                 setLoading(false);
  //               });
  //           }
  //         });
  //       }
  //     );
  //   }
  // };

  const handleImagesURL = (e) => {
    const files = e.target.files;
    const newImageURLs = [];

  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      Resizer.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        80,
        0,
        (uri) => {
          newImageURLs.push(uri);

          if(newImageURLs.length === files.length) {
            console.log(newImageURLs)
            setImageURLs(newImageURLs)
          }
        },
        'base64'
      )
  }
}

  const handlePostClick = () => {
    setLoading(true);
    if (description.length <= 5) {
      toast({
        title: "Description error.",
        description: "Please fill attleast 5 letter long Description.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false)
    }
    else if(imageURLs.length == 0){
      toast({
        title: "Image error.",
        description: "Please select attleast 1 photo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false)
    }
    else if (projectIsFor.length == 0) {
      toast({
        title: "Project Is for error.",
        description: "Please select attleast 1 Project selection.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false)
    }
    else if (projectCategory.length == 0) {
      toast({
        title: "Project Category error.",
        description: "Please select attleast 1 Project Category.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false)
    }
    else if (location.length == 0) {
      toast({
        title: "Location error.",
        description: "Please select your location.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false)
    }
    else {
      fetch("https://interiorme.onrender.com/post", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  pic: imageURLs,
                  description,
                  location,
                  projectCategory,
                  projectIsFor,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data, "new data");
                  toast({
                    title: "Post created !",
                    description: "Your project is created now.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  setLoading(false);
                  navigate("/e-bid");
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
    }

  }
  

  const role = localStorage.getItem("role");

  const fetchUser = () => {
    fetch("https://interiorme.onrender.com/user/getprofile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setUser(result);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {role == "Customer" ? (
        <>
          <Box p={"20px"}>
            <Text
              mb={"10px"}
              fontWeight={"extrabold"}
              color={"#ef492d"}
              fontSize={"25px"}
            >
              Post your Project
            </Text>
            <VStack
              boxShadow={"dark-lg"}
              borderRadius={"10px"}
              p={"35px 25px"}
              spacing={4}
              align="start"
              w={{ base: "100%", md: "80%", lg: "60%" }}
              m={"auto"}
            >
              <Flex alignItems={"center"} gap={"10px"}>
                <Circle>
                  <Avatar
                    border={"2px solid #dcdcdc"}
                    size={"lg"}
                    name={user.name}
                    src={user.pic}
                  />
                </Circle>
                <Text
                  fontSize={{ base: "10px", lg: "15px" }}
                  fontWeight={"bold"}
                >
                  Project title...Something in your mind {user.name} ?
                </Text>
              </Flex>
              <Box
                w={"89%"}
                alignSelf={"center"}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
                mt={"20px"}
              >
                <FormControl>
                  <FormLabel fontSize={{ base: "15px", lg: "16px" }}>
                    Project Description...
                  </FormLabel>
                  <Textarea
                    border={"1px solid black"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                  />
                </FormControl>
                <Box w={"100%"}>
                  <Text
                    fontSize={"11px"}
                    fontWeight={"bold"}
                    textAlign={"right"}
                  >
                    500 Characters remaining...
                  </Text>
                </Box>
                <FormControl>
                  <FormLabel fontSize={{ base: "10px", lg: "16px" }}>
                    Add Image...
                  </FormLabel>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesURL}
                  />
                </FormControl>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel fontSize={{ base: "10px", lg: "15px" }}>
                    Project is for..
                  </FormLabel>
                  <RadioGroup
                    value={projectIsFor}
                    onChange={setProjectIsFor}
                    display={"flex"}
                    gap={"10px"}
                    alignItems={"center"}
                  >
                    <Radio value="Professional">Professional</Radio>
                    <Radio value="Freelancer">Freelancer</Radio>
                  </RadioGroup>
                </FormControl>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel fontSize={{ base: "10px", lg: "15px" }}>
                    Project Category..
                  </FormLabel>
                  <select
                    style={{ padding: "10px" }}
                    value={projectCategory}
                    onChange={(e) => setprojectCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Turnkey Project">Turnkey Project</option>
                    <option value="Construction Only">Construction Only</option>
                    <option value="Designing Only">Designing Only</option>
                  </select>
                </FormControl>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel fontSize={{ base: "10px", lg: "15px" }}>
                    Location..
                  </FormLabel>
                  <Button onClick={handleLocationClick}>Get Location</Button>
                  <Box pl={"10px"} fontSize={{ base: "8px", lg: "15px" }}>
                    {location}
                  </Box>
                </FormControl>
                <Button
                  alignSelf={"center"}
                  bg={"#ef492d"}
                  colorScheme="red"
                  onClick={handlePostClick}
                  isLoading={loading}
                >
                  Post Your BID!
                </Button>
              </Box>
            </VStack>
          </Box>
        </>
      ) : (
        <>
          <Box p={"30px"}>
            <Text fontWeight={"bold"}>You Cannot Post E-Bid !</Text>
          </Box>
        </>
      )}
    </>
  );
}

export default PostEbid;
