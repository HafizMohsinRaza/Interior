import { useAuth0 } from "@auth0/auth0-react";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="outline"
      bg="#506dab"
      color="white"
      w="100%"
      h="40px"
      onClick={() => loginWithRedirect()}
    >
      Log In With Social Media
    </Button>
  );
};

const LogoutButton = ({ onLogout }) => {
    const { logout } = useAuth0();
  
    return (
      <Text
        onClick={() => {
          logout({ logoutParams: { returnTo: window.location.origin } });
          onLogout(); // Call the onLogout function when the button is clicked
        }}
        fontSize={"15px"} fontWeight={"semibold"}
        cursor={"pointer"}
      >
        Log Out
      </Text>
    );
  };

export { LoginButton, LogoutButton };
