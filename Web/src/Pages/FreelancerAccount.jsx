import { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Text,
  useToast,
  Checkbox,
  Image,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import FreelancerBar from "./FreelancerBar";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser, AiTwotoneCamera } from "react-icons/ai";
import Resizer from 'react-image-file-resizer';

function FreelancerAccount() {
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");

  const [contactNumbers, setContactNumbers] = useState([""]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [services, setServices] = useState([]);
  const [emailId, setEmailId] = useState("");
  const [areaOfSurvice, setAreaOfSurvice] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityGet, setCityGet] = useState([]);
  const [placesGet, setPlacesGet] = useState([]);
  const [countryGet, setCountryGet] = useState([]);

  const [profilePic, setProfilePic] = useState("")

  const [name,setName] = useState("");

  const [picLoading,setPicLoading] = useState(false);

  const [imageURLs,setImageURLs] = useState([]);

  const handleProfilePic = (e) => {
    const files = e.target.files;
    const newImageURLs = [];

    for(let i = 0;i < files.length; i++) {
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

  const uploadProfilePic = async() => {
    setPicLoading(true)
    const formData = {
      pic:imageURLs[0]
    };

    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      await axios.post(
        "https://interiorme.onrender.com/owner/profile",
        formData,
        { headers }
      );
      // Display success message or redirect to another page
      // console.log(formData);
      setProfilePic(imageURLs[0]);
      setPicLoading(false);
      toast({
        title: "Your Profile Picture is Updated Now !",

        status: "success",

        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Display error message
      setPicLoading(false)
    }
  }

  const fetchCity = async () => {
    try {
      fetch("https://interiorme.onrender.com/admin/city/get")
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setCityGet(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaces = async () => {
    try {
      fetch("https://interiorme.onrender.com/admin/places/get")
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setPlacesGet(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountry = async () => {
    try {
      fetch("https://interiorme.onrender.com/admin/country/get")
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setCountryGet(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCity();
    fetchPlaces();
    fetchCountry();
  }, []);

  const toast = useToast();

  const initialServices = [
    "Bedroom Decore",
    "Workspace Decore",
    "3D Modeling & Rendering",
    "Livingroom Decore",
    "Commercial places Decore",
    "3D Walkthrough",
    "Kidsroom Decore",
    "Complete Interior Projects",
    "Bedroom Decore",
    "Balcony Decore",
    "Turn Key Projects",
    "Livingroom Decore",
  ];
  const handleContactNumberChange = (index, value) => {
    const updatedNumbers = [...contactNumbers];
    updatedNumbers[index] = value;
    setContactNumbers(updatedNumbers);
  };

  const handleServiceCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setServices((prevServices) => [...prevServices, value]);
    } else {
      setServices((prevServices) =>
        prevServices.filter((service) => service !== value)
      );
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const formData = {
      companyName,
      category,
      contact: contactNumbers?.filter((number) => number.trim() !== ""),
      address,
      city,
      state,
      country,
      pincode,
      aboutUs,
      services,
      emailId,
      areaOfSurvice,
      websiteLink: websiteUrl,
      facebookLink: facebookUrl,
      instagramLink: instagramUrl,
      youtubeLink: youtubeUrl,
    };

    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      await axios.post(
        "https://interiorme.onrender.com/owner/profile",
        formData,
        { headers }
      );
      // Display success message or redirect to another page
      // console.log(formData);
      setLoading(false);
      toast({
        title: "Your Profile is Updated Now !",

        status: "success",

        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Display error message
    }
  };

  const role = localStorage.getItem("role");

  const [show, setShow] = useState(false);

  const handleDetails = () => {
    setShow(true);
  };

  const ownerId = localStorage.getItem("ownerId");

  const getOwnerById = async () => {
    fetch(`https://interiorme.onrender.com/owner/getownerbyid/${ownerId}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("jj", result);
        setCompanyName(result.companyName);
        setCategory(result.category);
        setEmailId(result.email);
        setAddress(result.address);
        setCity(result.city);
        setState(result.state);
        setCountry(result.country);
        if (result.contact !== undefined) {
          setContactNumbers(result.contact);
        }
        setPincode(result.pincode);
        setAboutUs(result.aboutUs);
        setAreaOfSurvice(result.areaOfSurvice);
        setServices(result.services);
        setWebsiteUrl(result.websiteLink);
        setFacebookUrl(result.facebookLink);
        setYoutubeUrl(result.youtubeLink);
        setInstagramUrl(result.instagramLink);
        setProfilePic(result.pic)
        setName(result.name)
      });
  };

  // console.log(pic)

  useEffect(() => {
    getOwnerById();
  }, []);

  const auth = useContext(AppContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    localStorage.clear();
    navigate("/rolelogin");
    window.location.reload();
  };

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
        <Flex justifyContent={"space-between"}>
          <Text textAlign={"start"} fontSize={"20px"} fontWeight={"bold"}>
            {role} Account
          </Text>
          <Text
            onClick={handleLogout}
            display={"flex"}
            alignItems={"center"}
            gap={"5px"}
            color={"red"}
            fontWeight={"bold"}
            cursor={"pointer"}
          >
            {" "}
            <BiLogOut /> Log-out
          </Text>
        </Flex>
        <FreelancerBar />
        <form onSubmit={handleSubmit}>
          <Flex pr={{base:"",lg:"90px"}} direction={{base:"column-reverse",lg:"row"}}>
            <Box w={{base:"100%",lg:"70%"}}>
                <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "50%" }}>
                <FormLabel>Freelancers Name</FormLabel>
                <Input
                  placeholder="Minimum 4 characters"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  w={"100%"}
                />
              </FormControl>
              <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "50%" }}>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Choose category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="Architects">Architects</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Contractors & Construction Company">
                    Contractors & Construction Company
                  </option>
                  <option value="Kitchen Designer">Kitchen Designer</option>
                  <option value="Landscape Designer">Landscape Designer</option>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
              <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "50%" }}>
                <FormLabel>Email Id</FormLabel>
                <Input
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Minimum 4 characters"
                />
              </FormControl>
              <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "50%" }}>
                <FormLabel>Contact Numbers</FormLabel>
                <Input
                  value={contactNumbers[0]}
                  placeholder="Phone Number"
                  onChange={(event) =>
                    handleContactNumberChange(0, event.target.value)
                  }
                  mb={2}
                />
              </FormControl>
            </Box>
            <Box mt={"10px"} h={"95%"} border={"2px solid #e2e8f0"} borderRadius={"3px"} w={{base:"100%",lg:"30%"}} p={"20px"}>
                <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"20px"}>
                  <Box>
                    <Avatar border={"2px solid lightgrey"} bg='red.500' icon={<AiOutlineUser fontSize='3.5rem' />} size='2xl' name={name} src={profilePic} />
                    <label htmlFor='fileInput' >
                        <AiTwotoneCamera style={{position:"absolute",right:"360px",top:"410px",fontSize:"30px",color:"#d9d9d9",cursor:"pointer"}} />
                    </label>
                    <input type='file' accept="image/*" onChange={handleProfilePic} id='fileInput' style={{display:"none"}} />
                  </Box>
                  <Button variant={"outline"} colorScheme="red" onClick={uploadProfilePic} isLoading={picLoading} >Update Profile Picture</Button>
                </Box>
            </Box>
          </Flex>

          <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
            <FormLabel>Address</FormLabel>
            <Input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </FormControl>
          <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
            <FormLabel>City</FormLabel>
            <Select
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option>City</option>
              {cityGet?.map((city,index) => (
                <option key={index} >{city?.city}</option>
              ))}
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
            <FormLabel>Place</FormLabel>
            <Select
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option>State</option>
              {placesGet?.map((place,index) => (
                <option key={index} >{place?.place}</option>
              ))}
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
            <FormLabel>Country</FormLabel>
            <Select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              <option>Country</option>
              {countryGet?.map((country,index) => (
                <option key={index} >{country?.country}</option>
              ))}
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
            <FormLabel>Pincode</FormLabel>
            <Input
              value={pincode}
              onChange={(event) => setPincode(event.target.value)}
            />
          </FormControl>
          <Button onClick={handleDetails}>Additional Bussiness Details</Button>
          {show == true ? (
            <>
              <Flex justifyContent={"space-between"}>
                <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
                  <FormLabel>About</FormLabel>
                  <Textarea
                    value={aboutUs}
                    onChange={(event) => setAboutUs(event.target.value)}
                    placeholder="Add About Us details of your bussiness to let people know more about you and your bussiness."
                  />
                </FormControl>

                <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
                  <FormLabel>Area of Survice</FormLabel>
                  <Textarea
                    value={areaOfSurvice}
                    onChange={(e) => setAreaOfSurvice(e.target.value)}
                    placeholder="Add About Us details of your bussiness to let people know more about you and your bussiness."
                  />
                </FormControl>
              </Flex>
              <FormControl mb={4}>
                <FormLabel>Services Provided</FormLabel>
                <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
                  {initialServices?.map((service,index) => (
                    <Flex w={{ base: "auto", lg: "25%" }} gap={"5px"}>
                      <Checkbox
                        type="checkbox"
                        key={index}
                        value={service}
                        onChange={handleServiceCheckboxChange}
                        isChecked={services?.includes(service)}
                      />
                      <label style={{ fontSize: "15px" }}>{service}</label>
                    </Flex>
                  ))}
                </Box>
              </FormControl>

              <FormControl mb={4} display={"flex"} alignItems={"center"}>
                <FormLabel>Website URL</FormLabel>
                <Input
                  w={{ base: "60%", md: "80%", lg: "45%" }}
                  value={websiteUrl}
                  placeholder="http://"
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4} display={"flex"} alignItems={"center"}>
                <FormLabel>Facebook URL</FormLabel>
                <Input
                  w={{ base: "55%", md: "80%", lg: "45%" }}
                  value={facebookUrl}
                  placeholder="http://"
                  onChange={(event) => setFacebookUrl(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4} display={"flex"} alignItems={"center"}>
                <FormLabel>Instagram URL</FormLabel>
                <Input
                  w={{ base: "55%", md: "80%", lg: "45%" }}
                  value={instagramUrl}
                  placeholder="http://"
                  onChange={(event) => setInstagramUrl(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4} display={"flex"} alignItems={"center"}>
                <FormLabel>Youtube URL</FormLabel>
                <Input
                  w={{ base: "60%", md: "80%", lg: "45%" }}
                  value={youtubeUrl}
                  placeholder="http://"
                  onChange={(event) => setYoutubeUrl(event.target.value)}
                />
              </FormControl>
              <Button isLoading={loading} type="submit" colorScheme="blue">
                Apply Now
              </Button>
            </>
          ) : (
            <></>
          )}
        </form>
      </Box>
    </>
  );
}

export default FreelancerAccount;
