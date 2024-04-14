// components/InitUser.jsx

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import {URL} from "../assets/link"
import { userState } from "../store/atom/user";

function extractUsername(email) {
  // Find the index of the "@" symbol
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    // Extract the substring before the "@" symbol
    const username = email.substring(0, atIndex);
    return username;
  } else {
    // If "@" is not found, return the original email
    return email;
  }
}


function InitUser() {
  const setUser = useSetRecoilState(userState);
  const fetchData = async () => {
    const token=localStorage.getItem("token")
    if(token){
    try {
     
      const response = await axios.get(`${URL}/me`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.email) {
      
        const email=response.data.email;
         const userName = extractUsername(email)
        
       await setUser({
         isLoading: false,
         userMail: response.data.email,
         userName: userName,
       });
      } else {
        
       await setUser({
          isLoading: false,
          userMail: null,
          userName:null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userMail: null,
      });
    }
  }}

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return <></>;
}

export default InitUser;
