import { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
  Text,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import ProfessionalBar from "./ProfessionalBar";
import { BiLogOut } from "react-icons/bi";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiTwotoneCamera } from "react-icons/ai";
import Resizer from 'react-image-file-resizer';

function ProfessionalAccount() {
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [contactNumbers, setContactNumbers] = useState(["", ""]);
  const [startingCost, setStartingCost] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [services, setServices] = useState([]);
  const [otherService, setOtherService] = useState("");
  const [achievements, setAchievements] = useState("");
  const [professionalInfo, setProfessionalInfo] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityGet, setCityGet] = useState([]);
  const [placesGet, setPlacesGet] = useState([]);
  const [countryGet, setCountryGet] = useState([]);

  const [profilePic,setProfilePic] = useState("");

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
          console.log(response);
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
          console.log(response);
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
          console.log(response);
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
    "Interior Design",
    "Home Restoration",
    "Eco/Green Building Designs",
    "Handicap-Accessible",
    "Architectural Design",
    "Structural Engeering",
    "Historic Building Conservation",
    "Landscape Plans/Design",
    "Floor Plans",
    "3D Rendering",
    "Kitchen Renovation & Remodeling",
    "Gym & Yoga",
  ];

  const handleContactNumberChange = (index, value) => {
    const updatedNumbers = [...contactNumbers];
    updatedNumbers[index] = value;
    setContactNumbers(updatedNumbers);
  };

  // console.log(contactNumbers,"ddddd")

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
      companyFilter,
      contact: contactNumbers.filter((number) => number.trim() !== ""),
      projectStartingCost: startingCost,
      address,
      city,
      state,
      country,
      pincode,
      aboutUs,
      services,
      achievements,
      profInfo: professionalInfo,
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
      setLoading(false);
      toast({
        title: "Your Profile is Updated Now !",

        status: "success",

        isClosable: true,
        position: "top",
      });
      console.log(formData);
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
        const filteredContactNumbers = result.contact.filter(
          (number) => number.trim() !== ""
        );
        // console.log(result)
        setCompanyName(result.companyName);
        setCategory(result.category);
        setCompanyFilter(result.companyFilter);
        setAddress(result.address);
        setCity(result.city);
        setState(result.state);
        setCountry(result.country);
        setStartingCost(result.projectStartingCost);
        setPincode(result.pincode);
        setAboutUs(result.aboutUs);
        setAchievements(result.achievements);
        setProfessionalInfo(result.profInfo);
        setServices(result.services);
        setContactNumbers(filteredContactNumbers);
        setWebsiteUrl(result.websiteLink);
        setFacebookUrl(result.facebookLink);
        setInstagramUrl(result.instagramLink);
        setYoutubeUrl(result.youtubeLink);
        setProfilePic(result.pic)
        setName(result.name)
      });
  };

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
        <ProfessionalBar />
        <form onSubmit={handleSubmit}>
          <Flex pr={{base:"",lg:"90px"}} direction={{base:"column-reverse",lg:"row"}}>
            <Box  w={{base:"100%",lg:"70%"}}>
                <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "50%" }}>
                <FormLabel>Company Name</FormLabel>
                <Input
                  placeholder="Minimum 4 characters"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
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
                <FormLabel>Contact Numbers</FormLabel>
                <Input
                  value={contactNumbers[0]}
                  placeholder="Phone Number"
                  onChange={(event) =>
                    handleContactNumberChange(0, event.target.value)
                  }
                  mb={2}
                />
                <Input
                  value={contactNumbers[1]}
                  placeholder="Phone Number"
                  onChange={(event) =>
                    handleContactNumberChange(1, event.target.value)
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
            <FormLabel>Project Starting Cost</FormLabel>
            <Input
              value={startingCost}
              onChange={(event) => setStartingCost(event.target.value)}
            />
          </FormControl>
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
              {cityGet.map((city) => (
                <option>{city.city}</option>
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
              {placesGet.map((place) => (
                <option>{place.place}</option>
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
              {countryGet.map((country) => (
                <option>{country.country}</option>
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
              <FormControl mb={4} w={{ base: "100%", md: "80%", lg: "35%" }}>
                <FormLabel>About Us</FormLabel>
                <Textarea
                  value={aboutUs}
                  onChange={(event) => setAboutUs(event.target.value)}
                  placeholder="Add About Us details of your bussiness to let people know more about you and your bussiness."
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Services Provided</FormLabel>
                <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
                  {initialServices.map((service) => (
                    <Flex w={{ base: "auto", lg: "25%" }} gap={"5px"}>
                      <input
                        type="checkbox"
                        key={service}
                        value={service}
                        onChange={handleServiceCheckboxChange}
                        isChecked={services.includes(service)}
                      />
                      <label style={{ fontSize: "15px" }}>{service}</label>
                    </Flex>
                  ))}
                </Box>
                {services.map((service) => (
                  <Box>
                    <Checkbox
                      key={service}
                      value={service}
                      onChange={handleServiceCheckboxChange}
                      isChecked={services.includes(service)}
                    >
                      {service}
                    </Checkbox>
                  </Box>
                ))}
                <Flex alignItems={"center"} gap={"10px"}>
                  <Input
                    value={otherService}
                    onChange={(event) => setOtherService(event.target.value)}
                    placeholder="Add other Service"
                    mt={2}
                    w={"50%"}
                  />
                  <Button
                    onClick={() => {
                      if (otherService.trim() !== "") {
                        setServices((prevServices) => [
                          ...prevServices,
                          otherService,
                        ]);
                        setOtherService("");
                      }
                    }}
                    variant="outline"
                    size="sm"
                    mt={2}
                  >
                    Add Service
                  </Button>
                </Flex>
              </FormControl>
              <FormControl w={{ base: "100%", md: "80%", lg: "35%" }} mb={4}>
                <FormLabel>Achievements</FormLabel>
                <Textarea
                  value={achievements}
                  onChange={(event) => setAchievements(event.target.value)}
                />
              </FormControl>
              <FormControl w={{ base: "100%", md: "80%", lg: "35%" }} mb={4}>
                <FormLabel>Professional Informations</FormLabel>
                <Textarea
                  value={professionalInfo}
                  onChange={(event) => setProfessionalInfo(event.target.value)}
                />
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

export default ProfessionalAccount;
