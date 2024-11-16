
import React from "react";
import { UserProvider } from './utils/UserContext'
import MainNavigation from "./navigations/MainNavigation";
const App = () => {
  return (
   
       <UserProvider>
       <MainNavigation />
    </UserProvider>
     
  );
};

export default App;
