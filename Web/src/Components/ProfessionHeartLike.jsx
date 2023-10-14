import { Box, Circle, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function ProfessionHeartLike({
  name,
  email,
  pic,
  companyName,
  address,
  city,
  country,
  rating,
  id,
  contact,
  reviews,
}) {
  const toast = useToast();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId');
  const ownerId = localStorage.getItem('ownerId');

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if(role == "Customer"){
      if(userId == null) {

      }else{
        fetch(`https://interiorme.onrender.com/wishbook/savedProf/${userId}`,{
          method:"GET"
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          const isLiked = data.savedProfessional.some((savedProf) => savedProf.refId == id);
          setLiked(isLiked)
        })
        .catch((error) => {
          console.error("Error fetching saved photos", error);
        });
      }
    } else {
      if(ownerId == null){

      }else{
        fetch(`https://interiorme.onrender.com/ownerwishbook/savedProf/${ownerId}`,{
        method:"GET"
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const isLiked = data.savedProfessional.some((savedProf) => savedProf.refId == id);
        setLiked(isLiked)
      })
      .catch((error) => {
        console.error("Error fetching saved photos", error);
      });
      }
    }
  },[])

  // const handleLikeClick = async () => {
  //   // console.log(reviews, "jjj");
  //   if (token) {
  //     try {
  //       if (liked) {
  //         fetch(`https://interiorme.onrender.com/wishbook/professional/${id}`, {
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
  //         fetch("https://interiorme.onrender.com/wishbook/professional", {
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
  //             contact,
  //             reviews: reviews,
  //             refId: id,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             // console.log(data, "new data");
  //             setLiked(true);
  //             toast({
  //               title: "Professional Details.",
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
    if(token) {
      fetch("https://interiorme.onrender.com/wishbook/checkSavedProfessional",{
        method:"post",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
          profId:id
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.isSaved == false){
          toast({
            title: "Professional Details.",
            description: "Professional Removed!",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
          setLiked(false);
        }
        else{
          toast({
            title: "Professional Details.",
            description: "Professional saved to wishbook!",
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
      fetch("https://interiorme.onrender.com/ownerwishbook/checkOwnerSavedProf",{
        method:"post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({
          profId:id
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.isSaved == false){
          toast({
            title: "Professional Details.",
            description: "Professional Removed!",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
          setLiked(false);
        }
        else{
          toast({
            title: "Professional Details.",
            description: "Professional saved to wishbook!",
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
        title: "Professional Details.",
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

export default ProfessionHeartLike;
