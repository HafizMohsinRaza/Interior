import React , { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Context/AppContext';
import { Auth0Provider } from '@auth0/auth0-react';

const OtherComponent = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-r1y6kuzy53ihhcqc.us.auth0.com"
    clientId="FrpePadpk17wz3r4wEiCk8fFMBYSPGaP"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AppContextProvider>
      <ChakraProvider>
        
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <OtherComponent />
            </Suspense>
          </BrowserRouter>
        
      </ChakraProvider>
    </AppContextProvider>
  </Auth0Provider>
  
  
);
