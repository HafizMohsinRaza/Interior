import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfessionalBar3 from './ProfessionalBar3'
import axios from 'axios'

function ProfessionalLeads() {

    const role = localStorage.getItem("role")
    const ownerId = localStorage.getItem("ownerId")

    const [data1, setData1] = useState(0);
    const [data2, setData2] = useState(0);
    const [heartCount, setHeartCount] = useState(0);
    const [contactCount,setContactCount] = useState(null);

    const [totalLeads, setTotalLeads] = useState(0);

    

    const fetchData1 = () => {
        if(role == 'Professional'){
            fetch(`https://interiorme.onrender.com/wishbook/professional/${ownerId}/countSaved`)
            .then((res) => res.json())
            .then((result) => {
                setData1(result.count);
            })
        }
        else{
            fetch(`https://interiorme.onrender.com/wishbook/freelancer/${ownerId}/countSaved`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result,"freelancer")
                setData1(result.count);
            })
        }
    }

    const fetchData2 = () => {
        if(role =='Professional'){
            fetch(`https://interiorme.onrender.com/ownerwishbook/professional/${ownerId}/countSaved`)
            .then((res) => res.json())
            .then((result) => {
                setData2(result.count);
            })
        }
        else{
            fetch(`https://interiorme.onrender.com/ownerwishbook/freelancer/${ownerId}/countSaved`)
        .then((res) => res.json())
        .then((result) => {
            setData2(result.count);
        })
        }
    }

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, []);

    useEffect(() => {
        setHeartCount(data1 + data2);
        axios.get(`https://interiorme.onrender.com/owner/${ownerId}`)
        .then(response => {
            // console.log(response)
            setContactCount(response.data.clickCount)
            setTotalLeads(contactCount + heartCount);
        })
        .catch(error => {
            console.log(error)
        })
    }, [data1, data2, contactCount, heartCount]);

  return (
    <>
    <Box w="80%" p="10px" m="auto" border="7px dotted red" bg="white" mt="20px" mb="20px" >
        <Text textAlign={"start"} fontSize={"20px"} fontWeight={"bold"}>{role} Account</Text>
        <ProfessionalBar3/>
        <Box w={{base:"100%",lg:"50%"}} m={"auto"} mt={"20px"}>
            <Flex w={"100%"}>
                <Box border={"3px solid #f1f1f1"} w={"70%"} p={"20px"}>
                    <Text>Contact revealed through e-bid</Text>
                </Box>
                <Box w={"30%"} border={"3px solid #f1f1f1"} p={"20px"}>
                    <Text>{contactCount}</Text>
                </Box>
            </Flex>
                 
            <Flex>
                <Box border={"3px solid #f1f1f1"} w={"70%"} p={"20px"}>
                    <Text>General contact made</Text>
                </Box>
                <Box w={"30%"} border={"3px solid #f1f1f1"} p={"20px"}>
                    <Text>0</Text>
                </Box>
            </Flex>
                
            <Flex>
                <Box border={"3px solid #f1f1f1"} w={"70%"} p={"20px"}>
                    <Text>Heart Count</Text>
                </Box>
                <Box w={"30%"} border={"3px solid #f1f1f1"} p={"20px"}>
                    <Text>{heartCount}</Text>
                </Box>
            </Flex>
            <Flex>
                <Box border={"3px solid #f1f1f1"} w={"70%"} p={"20px"}>
                    <Text>Total Leads</Text>
                </Box>
                <Box w={"30%"} border={"3px solid #f1f1f1"} p={"20px"}>
                    <Text>{totalLeads}</Text>
                </Box>
            </Flex>
        </Box>
    </Box>
    </>
  )
}

export default ProfessionalLeads