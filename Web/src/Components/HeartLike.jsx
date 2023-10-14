import { Box, Icon, Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function HeartLike({ companyName, id }) {
  const [liked, setLiked] = useState(false);

  const toast = useToast();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const ownerId = localStorage.getItem("ownerId");

  const navigate = useNavigate();
  
  useEffect(() => {
    if(role == "Customer"){
      if(userId == null){

      }else{
        fetch(`https://interiorme.onrender.com/wishbook/${userId}`, { // Replace with your actual backend route
        method: "GET"
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const isLiked = data.savedPhotos.some((savedPhoto) => savedPhoto.refId == id);
        setLiked(isLiked)
      })
      .catch((error) => {
        console.error("Error fetching saved photos", error);
      });
      }
    }else{
      if(ownerId == null){

      }else{
        fetch(`https://interiorme.onrender.com/ownerwishbook/${ownerId}`, { // Replace with your actual backend route
        method: "GET"
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const isLiked = data.savedPhotos.some((savedPhoto) => savedPhoto.refId == id);
        // console.log(isLiked,"---liked")
        setLiked(isLiked)
      })
      .catch((error) => {
        console.error("Error fetching saved photos", error);
      });
      }
    }
  },[])
  // const handleLikeClick = async () => {
  //   if (token) {
  //     try {
  //       if (liked) {
  //         fetch(`https://interiorme.onrender.com/wishbook/photo/${id}`, {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then((result) => {
  //             // console.log(result);
  //             setLiked(false);
  //             toast({
  //               title: "Removed.",
  //               description: result.msg,
  //               status: "error",
  //               duration: 9000,
  //               isClosable: true,
  //             });
  //           });
  //       } else {
  //         fetch("https://interiorme.onrender.com/wishbook/photo", {
  //           method: "post",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //           body: JSON.stringify({
  //             pic: pics,
  //             companyName: companyName,
  //             refId: id,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             // console.log(data, "new data");
  //             setLiked(true);
  //             toast({
  //               title: "Photos Details.",
  //               description: data.msg,
  //               status: "success",
  //               duration: 1000,
  //               isClosable: true,
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     } catch (error) {
  //       console.error("Error occurred while updating saved status", error);
  //     }
  //   } else {
  //     toast({
  //       title: "Wishbook Details!",
  //       description: "Please Log In to perform this feature!",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const handleLikeClick = () => {
    if(token){
      fetch("https://interiorme.onrender.com/wishbook/checkSavedStatuses", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  photoId:id,
                  companyName:companyName
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data, "new data");
                  
                  if(data.isSaved == false){
                    toast({
                      title: "Photos Details.",
                      description: "Photo Removed!",
                      status: "error",
                      duration: 1000,
                      isClosable: true,
                    });
                    setLiked(false);
                  }
                  else{
                    toast({
                      title: "Photos Details.",
                      description: "Photo saved to wishbook!",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                    });
                    setLiked(true);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
    }else{
      toast({
        title: "Photos Details.",
        description: "Please Login first!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      navigate("/user-login")
    }
  }

  const handleOwnerLikeClick = () => {
    if(token){
      fetch("https://interiorme.onrender.com/ownerwishbook/checkSavedStatuses", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  photoId:id,
                  companyName:companyName
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data, "new data");
                  
                  if(data.isSaved == false){
                    toast({
                      title: "Photos Details.",
                      description: "Photo Removed!",
                      status: "error",
                      duration: 1000,
                      isClosable: true,
                    });
                    setLiked(false);
                  }
                  else{
                    toast({
                      title: "Photos Details.",
                      description: "Photo saved to wishbook!",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                    });
                    setLiked(true);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
    }else{
      toast({
        title: "Photos Details.",
        description: "Please Login first!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      navigate("/rolelogin")
    }
  };


  return (
    <>
      {role == "Customer" ? (
        <Tooltip label="Favourite" placement="top" hasArrow>
          <Box
            w="36px"
            h="36px"
            bg="#343332"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom="200px"
            right="80px"
            onClick={handleLikeClick}
          >
            {!liked ? (
              <Icon as={MdOutlineFavoriteBorder} w={6} h={6} color="white" />
            ) : (
              <Icon as={MdOutlineFavoriteBorder} w={6} h={6} color="red" />
            )}
          </Box>
        </Tooltip>
      ) : (
        <Tooltip label="Favourite" placement="top" hasArrow>
          <Box
            w="36px"
            h="36px"
            bg="#343332"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom="200px"
            right="80px"
            onClick={handleOwnerLikeClick}
          >
            {!liked ? (
              <Icon as={MdOutlineFavoriteBorder} w={6} h={6} color="white" />
            ) : (
              <Icon as={MdOutlineFavoriteBorder} w={6} h={6} color="red" />
            )}
          </Box>
        </Tooltip>
      )}
    </>
  );
}

export default HeartLike;
