import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* - Create a function that sends a call to server asking for cookies.token  
    from client to server as http auth.route
     if it exists ? true : false 
    assign it to state loggedIn
    send it through a context provider
    - Create a function that sends a call to server asking for cookies.token  
    from client to server as http auth.route
     if it exists ? decode user as userId : Unauthorized
     look for user in db with userId
     send it as json currentUser
*/

  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  //    make request
  async function getLoggedIn() {
    try {
      const loggedInResp = await axios.get(
        "http://localhost:2020/api/auth/loggedIn"
      );
      setLoggedIn(loggedInResp.data); // bool true/false

      // Fetch current user data if logged in
      if (loggedInResp.data) {
        const userResp = await axios.get(
          "http://localhost:2020/api/auth/currentUser"
        );
        setCurrentUser(userResp.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // on component start
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, currentUser }}>
      {/* components has access to bool value and the function 
      in case is first time logged in or nned to rehydrate */}
      {props.children} {/*to render router*/}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
