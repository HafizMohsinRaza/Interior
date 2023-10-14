import { Box, Flex, Heading,  Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ProfessionalCard from '../Components/ProfessionalCard';

function Professionals() {
    const [professionals,setProfessionals] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchProfessional = () => {

        fetch("https://interiorme.onrender.com/owner/allOwner").then(res => res.json())
        .then(result => {
        const filter = result.Owner.filter((word) => word.role == "Professional" )
            console.log(filter,"filter")
            setLoading(false)
            setProfessionals(filter)
        })
    }

    useEffect(() => {
        fetchProfessional()
    },[]);

    


  return (
    <>
    {
        loading ? <Spinner thickness='2px'
            speed='0.65s'
            emptyColor='gray.200'
            color='black.500'
            size='xl' mt={"30px"} mb={"30px"} /> 
            : 
        <Box background={"#f7f8f9"} >
        <Box m={"auto"} w={{base: '100%', lg: '75%'}} >
            <Heading fontSize={"30px"} textAlign={"left"} >Professionals</Heading>
                <Flex w={{base: '100%', lg: '100%'}} gap={"40px"} py={"30px"} direction={{ base: "column-reverse",  lg:"row" }} >
                    <Box m={"auto"} w={{base: '100%', lg: '85%'}} display={"flex"} flexDirection={"column"} gap={"20px"} >
                        {
                            professionals?.reverse()?.map((el,index) =>(
                                <ProfessionalCard key={index} name={el.name} email={el.email} id={el._id} pic={el.pic} companyName={el.companyName} address={el.address} city={el.city} country={el.country} reviews={el.reviews} services={el.services} contact={el.contact} />
                            ))
                        }
                        
                    </Box>
                </Flex>
            
        </Box>
        
    </Box>
    }
    </>
  )
}

export default Professionals