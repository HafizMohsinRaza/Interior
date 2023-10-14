import {
  Box,
  Text,
  Button,
  Input,
  Select,
  useToast,
  Progress,
  Flex,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Resizer from 'react-image-file-resizer';

import FreelancerBar2 from "./FreelancerBar2";
import { Link } from "react-router-dom";

const FreelancerProject = () => {
  const toast = useToast();

  const [bandfTitle, setBandfTitle] = useState("");
  const [bandfProjectType, setBandfProjectType] = useState("");
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [loading, setLoading] = useState(false);

  const [loading2,setLoading2] = useState(false)

  const [beforeImageURLs,setBeforeImageURLs] = useState([]);
  const [afterImageURLs,setAfterImageURLs] = useState([]);

  const [imageURLs,setImageURLs] = useState([]);

  const handleBeforeImage = (e) => {
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
            setBeforeImageURLs(newImageURLs)
          }
        },
        'base64'
      )
  }
  };


  const handleAfterImage = (e) => {
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
            setAfterImageURLs(newImageURLs)
          }
        },
        'base64'
      )
  }
  };


  const handleMainImagesURLs = (e) => {
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
  };

  

  const handleSubmit = () => {
    setLoading(true);
    if (title.length <= 5) {
      toast({
        title: "Upload Project Details",
        description: "Please write attleast 5 letter long Title",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }

    else if (projectType.length == 0) {
      toast({
        title: "Upload Project Details",
        description: "Please select attleast one Project Type",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }

    fetch("https://interiorme.onrender.com/ownerpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        projectType: projectType,
        pics: imageURLs[0],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast({
          title: "Upload Project",
          description: "Your Project is Uploaded!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Upload Project",
          description: err,
          status: "err",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const handleBeforeAndAfterPost = () => {
    setLoading2(true)
    if (beforeImageURLs.length == 0) {
      toast({
        title: "Before Picture!",
        description: "Please upload Before pic!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading2(false)
    }
    else if (afterImageURLs.length == 0) {
      toast({
        title: "After Picture!",
        description: "Please upload After pic!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading2(false)
    }
    else if (bandfTitle.length <= 5) {
      toast({
        title: "Before and After",
        description: "Please write attleast 5 letter long Title",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading2(false)
    }
    else if (bandfProjectType.length == 0) {
      toast({
        title: "Before and After",
        description: "Please select attleast 1 project type!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading2(false)
    } else {
      fetch("https://interiorme.onrender.com/ownerpost/beforeAfterPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bandfTitle: bandfTitle,
          bandfProjectType: bandfProjectType,
          beforePic: beforeImageURLs[0],
          afterPic: afterImageURLs[0],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          toast({
            title: "Upload Project",
            description: "Your Before and After image is Uploaded!",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setLoading2(false)
        })
        .catch((err) => {
          toast({
            title: "Upload Project",
            description: err,
            status: "err",
            duration: 4000,
            isClosable: true,
          });
          setLoading2(false)
        });
    }
  };

  const role = localStorage.getItem("role");

  return (
    <>
      <Box
        w="80%"
        p="10px"
        m="auto"
        border="7px dotted red"
        bg="white"
        mt="20px"
        mb="20px"
      >
        <Text textAlign={"start"} fontSize={"20px"} fontWeight={"bold"}>
          {role} Account
        </Text>
        <FreelancerBar2 />
        <Text p="6px" h="30px" bg="#db4f5c" textAlign={"start"}>
          Add Your Project Images
        </Text>
        <Box mb={"30px"}>
          <Box p={"10px"}>
            <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"left"}>
              Upload Before and After Project Images
            </Text>
          </Box>
          <Box
            w={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Flex justifyContent={"space-evenly"}>
              <Box p={"20px"}>
                <Text fontWeight={"bold"}>Before Image</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleBeforeImage}
                />
                
              </Box>
              <Box p={"20px"}>
                <Text fontWeight={"bold"}>After Image</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAfterImage}
                />
                
              </Box>
            </Flex>

            <Flex w={"100%"} p={"20px"}>
              <Box
                m={"auto"}
                w={{ base: "50%", md: "80%", lg: "50%" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                <Input
                  w={{ base: "100%", lg: "55%" }}
                  type="text"
                  placeholder="Project Title...Something in your mind?"
                  onChange={(e) => setBandfTitle(e.target.value)}
                />
                <Select
                  w={{ base: "100%", lg: "55%" }}
                  onChange={(e) => setBandfProjectType(e.target.value)}
                >
                  <option disabled>Select Project Type</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bath">Bath</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living">Living</option>
                  <option value="Dining">Dining</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Baby and Kids">Baby and Kids</option>
                  <option value="Home Office">Home Office</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Garden/Landscape">Garden/Landscape</option>
                  <option value="Corridors">Corridors</option>
                  <option value="Basement">Basement</option>
                  <option value="Furnitures">Furniture's</option>
                  <option value="Home Bar">Home Bar</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Office">Office</option>
                  <option value="Salon">Salon</option>
                  <option value="Gym and Yoga">Gym and Yoga</option>
                  <option value="Shop">Shop</option>
                </Select>
              </Box>
              <Box
                w={{ base: "50%", md: "80%", lg: "50%" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                <Box>
                  <Button
                    w={{ base: "100%", md: "80%", lg: "50%" }}
                    m={"auto"}
                    onClick={handleBeforeAndAfterPost}
                    isLoading={loading2}
                  >
                    Upload Before And After Picture
                  </Button>
                </Box>
                <Box>
                  <Link to="/allbeforeafterimages">
                    <Button
                      w={{ base: "100%", md: "80%", lg: "50%" }}
                      colorScheme="green"
                    >
                      All Before & After Images
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box border={"3px solid darkgrey"} borderRadius={"5px"}>
          <Box p={"10px"}>
            <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"left"}>
              Upload Project Images
            </Text>
          </Box>
          <Box
            p={"10px"}
            w={{ base: "100%", md: "80%", lg: "100%" }}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Input
              w={{ base: "100%", md: "80%", lg: "50%" }}
              type="file"
              accept="image/*"
              onChange={handleMainImagesURLs}
            />
            
            
            <Flex w={"100%"} p={"20px"}>
              <Box
                m={"auto"}
                w={{ base: "50%", md: "80%", lg: "50%" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                <Input
                  type="text"
                  placeholder="Project Title...Something in your mind?"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Select onChange={(e) => setProjectType(e.target.value)}>
                  <option disabled>Select Project Type</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bath">Bath</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Living">Living</option>
                  <option value="Dining">Dining</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Baby & Kids">Baby & Kids</option>
                  <option value="Home Office">Home Office</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Garden/Landscape">Garden/Landscape</option>
                  <option value="Corridors">Corridors</option>
                  <option value="Basement">Basement</option>
                  <option value="Furnitures">Furniture's</option>
                  <option value="Home Bar">Home Bar</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Office">Office</option>
                  <option value="Salon">Salon</option>
                  <option value="Gym and Yoga">Gym and Yoga</option>
                  <option value="Shop">Shop</option>
                </Select>
              </Box>
              <Box
                w={{ base: "50%", md: "80%", lg: "50%" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                <Box>
                  <Button
                    w={{ base: "100%", md: "80%", lg: "50%" }}
                    m={"auto"}
                    onClick={handleSubmit}
                    isLoading={loading}
                  >
                    Upload Files
                  </Button>
                </Box>
                <Box>
                  <Link to="/allownerprojectimages">
                    <Button
                      w={{ base: "100%", md: "80%", lg: "50%" }}
                      colorScheme="green"
                    >
                      All Project Images
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box
        w="80%"
        p="10px"
        m="auto"
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
      >
        <Text
          textAlign={"left"}
          color={"#fc2c2c"}
          fontSize={"18px"}
          fontWeight={"semibold"}
        >
          Image Upload Guidelines
        </Text>
        <Flex gap={"5px"}>
          <input type="checkbox" style={{ marginBottom: "17px" }} />
          <Text textAlign={"left"} fontSize={"12px"} fontWeight={"semibold"}>
            I certify that the work uploaded is my very own / is that the
            copyright of our firm. I understand that any work found to be
            someone elese's would be removed immediately, and action might be
            taken. And the images can also be used by InteriorMe Company on
            thier portal section along with original owners name.
          </Text>
        </Flex>
        <Button
          alignSelf={"flex-start"}
          bg={"#fc2c2c"}
          color={"white"}
          p={"10px 60px 10px 60px"}
        >
          Apply
        </Button>
      </Box>
    </>
  );
};

export default FreelancerProject;
