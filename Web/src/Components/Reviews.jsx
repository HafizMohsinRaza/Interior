import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Progress,
  Select,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { HiOutlinePaperClip } from "react-icons/hi";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

function Reviews({ freelancer }) {
//   console.log(freelancer, "Freelancer");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [imgload, setImgload] = useState(0);

  const [imageURL, setImageURL] = useState([]);


  const { id } = useParams();

  const toast = useToast();

  const handleImage = () => {
    let count = 0;

    for (let i = 0; i < images.length; i++) {
      const storageRef = ref(storage, `/files/${images[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(percent);
          setImgload(percent);
        },
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            imageURL.push(url);
            console.log(imageURL);
            count++;

            if (count == images.length) {
              setImageURL(imageURL);
            }
          });
        }
      );
    }
  };

  useEffect(() => {
    handleImage();
  }, [images]);

  const reviewPost = () => {
    setLoading(true);
    fetch("https://interiorme.onrender.com/owner/review", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        ownerId: id,
        text: text,
        rating: rating,
        pic: imageURL,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        toast({
          title: "Review created !",
          description: "Your review is created now.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        window.location.reload();
      });
  };

  const ratings = freelancer?.reviews?.map((review) => review.rating);

  const sum = ratings?.reduce((total, rating) => total + rating, 0);
  const averageRating = (sum / ratings?.length).toFixed(1);

  return (
    <Box p={"20px 0px 20px 0px"} alignItems={"center"} id="review">
      <Flex direction={["column", "row"]} p={{ base: "20px" }}>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Text fontSize={"20px"} fontWeight={"semibold"}>
            {freelancer?.reviews?.length} Reviews
          </Text>
          <Rating value={averageRating} />
          {freelancer?.reviews?.length == 0 ? (
            <></>
          ) : (
            <Text>{averageRating} out of 5</Text>
          )}
        </Box>
        <Spacer />
        <Flex direction={["column", "row"]} gap={"10px"}>
          <Box>
            <Button>Leave a Review</Button>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <Box overflow={"scroll"} h={"400px"}>
          {freelancer?.reviews?.length !== 0 ? (
            freelancer?.reviews?.map((el) => (
              <>
                <Box borderBottom={"1px solid darkgrey"}>
                  <Box display={"flex"} gap={"20px"} p={"20px"}>
                    <Box>
                      <Circle>
                        <Avatar size="lg" src={el.postedBy?.pic} />
                      </Circle>
                    </Box>
                    <Flex justifyContent={"space-between"} w={"90%"}>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"10px"}
                      >
                        <Flex gap={"10px"}>
                          <Text textAlign={"left"}>{el.postedBy.name}</Text>
                          <Rating value={el.rating} />
                        </Flex>
                        <Flex gap={"6px"} alignItems={"center"}>
                          <HiOutlinePaperClip />
                          <Text fontSize={"12px"}>
                            {el?.time?.substring(0, 21)}
                          </Text>
                        </Flex>
                        <Text textAlign={"left"} fontWeight={"light"}>
                          {el.text}
                        </Text>
                      </Box>
                      <Box>
                        <Flex gap={"8px"} alignItems={"center"} pt={"60px"}>
                          <BsHandThumbsUp
                            style={{ color: "green", cursor: "pointer" }}
                          />
                          <Text color={"green"}>0</Text>
                          <BsHandThumbsDown
                            style={{ color: "red", cursor: "pointer" }}
                          />
                          <Text color={"red"}>0</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                  <Box display={"flex"} p={"20px"} gap={"10px"}>
                    {el.pic.map((el,index) => (
                      <>
                        <Box w={{ base: "50%", lg: "15%" }} boxShadow={"2xl"} cursor={"pointer"}>
                          <Image w={"100%"} h={"100%"} src={el} />
                        </Box>
                       
                      </>
                    ))}
                  </Box>
                </Box>
              </>
            ))
          ) : (
            <Text color={"lightgrey"}>Their is no Reviews</Text>
          )}
        </Box>
      </Box>
      {localStorage.getItem("role") == "Customer" ? (
        <Box p={"40px"} background={"white"} borderRadius={"5px"}>
          <Box borderBottom={"2px solid lightgrey"} p={"20px 20px 40px 20px"}>
            <Text textAlign={"start"}>Leave A Review</Text>
          </Box>
          <Flex gap={"30px"} pt={"20px"}>
            <FormControl>
              <FormLabel>Upload Photo {"(Optional)"}</FormLabel>
              <Input
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </FormControl>
          </Flex>
          <Box w={"100%"} p={"10px 0px 10px 0px"}>
            <Progress
              w={{ base: "100%", md: "80%", lg: "100%" }}
              hasStripe
              value={imgload}
            />
          </Box>
          <FormControl>
            <FormLabel>Review</FormLabel>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Textarea>
          </FormControl>
          <Box display={"flex"} justifyContent={"flex-start"}>
            <Button
              onClick={reviewPost}
              mt={"20px"}
              background={"#0d0d0d"}
              color={"white"}
              p={"10px 10px 11px 10px"}
              isLoading={loading}
            >
              Submit Review
            </Button>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Reviews;
