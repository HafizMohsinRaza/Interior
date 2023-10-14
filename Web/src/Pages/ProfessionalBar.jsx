import React from 'react'
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProfessionalBar = () => {

  const activeColor = useColorModeValue('red.500', 'red.200');
  const inactiveColor = useColorModeValue('gray.700', 'gray.300');

  return (
   
       <Flex as="nav" align="center" justify="space-between" p={4} bg="gray.200">
     
      <Box display={"grid"} m="auto" alignItems={"center"} justifyContent="center" gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)", lg: "repeat(4,1fr)" }}>
        <Link to="/profAccount" style={{ textDecoration: 'none' }}>
          <Text
            as="span"
            color={activeColor}
            _hover={{ color: 'gray.800' }}
            mr={4}
          >
            Information
          </Text>
        </Link>

        <Link to="/profProjects" style={{ textDecoration: 'none' }}>
          <Text
            as="span"
            color={inactiveColor}
            _hover={{ color: 'gray.800' }}
            mr={4}
          >
            Projects
          </Text>
        </Link>
        <Link to="/membership-plan" style={{ textDecoration: 'none' }}>
          <Text
            as="span"
            color={inactiveColor}
            _hover={{ color: 'gray.800' }}
            mr={4}
          >
            Membership Plan
          </Text>
        </Link>
        <Link to="/leads" style={{ textDecoration: 'none' }}>
          <Text
            as="span"
            color={inactiveColor}
            _hover={{ color: 'gray.800' }}
          >
            Leads
          </Text>
        </Link>
      </Box>
    </Flex> 
    
  )
}

export default ProfessionalBar
