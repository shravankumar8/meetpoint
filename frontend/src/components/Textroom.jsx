import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { userEmailState } from "../store/selectors/userEmail";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isLoading";

import Button from "@mui/material/Button";
import { SOCKET_URL } from "../assets/link";


function Textroom() {


  const [socket, setSocket] = useState(null);
  const params = useParams();
  const roomId = params.roomId;
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
 
  const [message,setMessage]=useState("")

  const [messageDom, setMessageDom] = useState([
    {
      name: "lingampally.venkey",
      message: " ga annam tinnava ?",
    },
    {
      name: "kumashrva.venkey",
      message: " ga annam tinnava ?",
    },
  ]);




  
  useEffect(() => {
   
     if (!userLoading && !userEmail) {
       navigate("/"); // Redirect only when not loading and email is not available
     }
    
    async function connectToSocket() {
      if (!userEmail) {
        // Handle case where userEmail is not available yet
        return;
      }

      const s = await io.connect("http://localhost:3001");
      s.on("connect", () => {
        console.log("User email:", userEmail);
        setSocket(s);
        s.emit("join", {
          roomId,
          userEmail,
        
        });
        
        s.on("receivedMessage", ({ message, otherUserEmail }) => {
          // console.log({ message: message, otherUserEmail: otherUserEmail });
          console.log(otherUserEmail)
          if(otherUserEmail){
if (otherUserEmail !== userEmail) {
  console.log({ email: otherUserEmail, message: message });

  setMessageDom((prevMessages) => [
    ...prevMessages,
    { name: otherUserEmail, message: message },
  ]);
}
          }
          
        });

      });

      return () => {
        // Cleanup logic when component unmounts
        s.disconnect();
      };
    }
   

    connectToSocket();

    // Cleanup logic when component unmounts or userEmail changes
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [,roomId, userEmail,userLoading]); // Make sure to include the dependencies if needed

    const handleSendMessage = () => {
      // Emit a socket event to send the message
      const socket = io(SOCKET_URL);
      socket.emit("sendMessage", {
       
        message: message,
        userEmail: userEmail,
        roomId: roomId,
      });

      // Update the messageDom state locally
      setMessageDom((prevMessages) => [
        ...prevMessages,
        { name: userEmail, message },
      ]);

      // Clear the input field
      setMessage("");
    };

 
  return (
    <div
      style={{
       
        margin: "0 auto",
        backgroundColor: "#DFDFDF",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        position: "relative", // Changed from "absolute" to "relative"
        height: "80vh",
        borderRadius: "36px",
        width: "90%",
        // marginRight:"10px"
      }}
    >
      {/* Navbar */}
      <div
        style={{
          marginTop: "10px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
      >
        Navbar Content
      </div>

      {/* Chat Boxes */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {messageDom.map((index) => (
          <div key={index.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                {index.name}:
              </div>
              <div>{index.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "80%",
            margin: "10px auto",
          }}
        >
          <form>
            <input
              style={{
                fontSize: "20px",
                padding: "4px",
                borderRadius: "10px",
                border: "none",
                height: "30px",
                width: "100%",
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
             
              value={message}
              name=""
              id=""
            />
          </form>
        </div>
        <div style={{ marginRight: "50px", marginLeft: "-20px" }}>
          <Button
            onClick={handleSendMessage}
            style={{
              backgroundColor: "black",
              padding: "7px",
              fontSize: "13px",
            }}
            variant="contained"
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Textroom;
