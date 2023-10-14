import { Box, Circle, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function FreelancerHeartLike({
  name,
  email,
  pic,
  companyName,
  address,
  city,
  country,
  rating,
  id,
  reviews,
}) {
  const [liked, setLiked] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId');
  const ownerId = localStorage.getItem('ownerId');
  const toast = useToast();

  useEffect(() => {
    if(role == "Customer"){
      if(userId == null) {

      }else{
        fetch(`https://interiorme.onrender.com/wishbook/savedFree/${userId}`,{
          method:"GET"
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const isLiked = data.savedFreelancer.some((savedProf) => savedProf.refId == id);
          setLiked(isLiked)
        })
        .catch((error) => {
          console.error("Error fetching saved photos", error);
        });
      }
    } else {
      if(ownerId == null){

      }else{
        fetch(`https://interiorme.onrender.com/ownerwishbook/savedFree/${ownerId}`,{
        method:"GET"
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const isLiked = data.savedFreelancer.some((savedFree) => savedFree.refId == id);
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
  //         fetch(`https://interiorme.onrender.com/wishbook/freelancer/${id}`, {
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
  //         fetch("https://interiorme.onrender.com/wishbook/freelancer", {
  //           method: "post",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //           body: JSON.stringify({
  //             name,
  //             email,
  //             pic,
  //             companyName,
  //             address,
  //             city,
  //             country,
  //             rating,
  //             reviews,
  //             refId: id,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             // console.log(data, "new data");
  //             setLiked(true);
  //             toast({
  //               title: "Freelancer Details.",
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
  const navigate = useNavigate();
  const handleLikeClick = () => {
    if(token){
      fetch("https://interiorme.onrender.com/wishbook/checkSavedFreelancer",{
        method:"post",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
          freeId:id
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.isSaved == false){
          toast({
            title: "Freelancer Details.",
            description: "Freelancer Removed!",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
          setLiked(false);
        }
        else{
          toast({
            title: "Freelancer Details.",
            description: "Freelancer saved to wishbook!",
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
    }
    else{
      toast({
        title: "Photos Details.",
        description: "Please Login first!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      // navigate("/user-login")
      
      navigate("/user-login")
    }
  }

  const handleOwnerLikeClick = () => {
    if(token){
      fetch("https://interiorme.onrender.com/ownerwishbook/checkOwnerSavedFree",{
        method:"post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
          freeId:id
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.isSaved == false){
          toast({
            title: "Freelancer Details.",
            description: "Freelancer Removed!",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
          setLiked(false);
        }
        else{
          toast({
            title: "Freelancer Details.",
            description: "Freelancer saved to wishbook!",
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
  }
  else{
    toast({
      title: "Freelancer Details.",
      description: "Please Login first!",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
    navigate("/rolelogin")
  }
}

  return (
    <>
      {role == "Customer" ? (
        <Box onClick={handleLikeClick}>
          {!liked ? (
            <Circle
              bg={"#eeeeee"}
              title="Add to Wishbook"
              cursor={"pointer"}
              p={{ base: "10px", lg: "5px" }}
            >
              <AiFillHeart style={{ fontSize: "30px" }} />
            </Circle>
          ) : (
            <Circle
              bg={"#eeeeee"}
              title="Add to Wishbook"
              cursor={"pointer"}
              p={{ base: "10px", lg: "5px" }}
            >
              <AiFillHeart style={{ fontSize: "30px", color: "red" }} />
            </Circle>
          )}
        </Box>
      ) : (
        <Box onClick={handleOwnerLikeClick}>
          {!liked ? (
            <Circle
              bg={"#eeeeee"}
              title="Add to Wishbook"
              cursor={"pointer"}
              p={{ base: "10px", lg: "5px" }}
            >
              <AiFillHeart style={{ fontSize: "30px" }} />
            </Circle>
          ) : (
            <Circle
              bg={"#eeeeee"}
              title="Add to Wishbook"
              cursor={"pointer"}
              p={{ base: "10px", lg: "5px" }}
            >
              <AiFillHeart style={{ fontSize: "30px", color: "red" }} />
            </Circle>
          )}
        </Box>
      )}
    </>
  );
}

export default FreelancerHeartLike;
