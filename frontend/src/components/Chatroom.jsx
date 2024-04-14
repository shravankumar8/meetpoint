import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { FRONTEND_URL,SOCKET_URL,URL } from "../assets/link";

// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

function ChatRoom() {
    const userLoading = useRecoilValue(isUserLoading);
    const navigate = useNavigate();
  const [shareLink, setShareLink] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const userEmail = useRecoilValue(userEmailState);
   useEffect(() => {
      if (!userLoading && !userEmail) {
        navigate("/"); // Redirect only when not loading and email is not available
      }
   }, [userLoading,userEmail, navigate]);
    if (!userEmail || userLoading) {
      // Return loading state or handle redirect when user email is not available
      return <div>Loading...</div>;
    }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Card
        varint={"outlined"}
        style={{
          flexDirection: "column",
          display: "flex",
          width: 400,
          padding: 20,
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography variant={"h5"}>Create your Room</Typography>
        <br />
        <br />
        <TextField
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          // value={email}
          fullWidth={true}
          label="RoomId"
          variant="outlined"
          required
        ></TextField>

        {shareLink ? (
          <>
            <br />
            <br />
            <TextField
              required
              id="outlined-required"
              label="Required"
              value={shareLink}
            />
            <br />

            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
              }}
              variant="outlined"
            >
              Copy
            </Button>
            <br />
            <Button
              onClick={() => {
                navigate(`/chatroom/${roomId}`);
              }}
              variant="outlined"
            >
              Join
            </Button>

          </>
        ) : (
          <></>
        )}
        <br />
        <br />
        <br />
        <Button
          onClick={async () => {
            setShareLink(`${FRONTEND_URL}/${roomId}`);
            // navigate(`/Chatroom/$roomId`);
            console.log(URL);   
            // setShareLink(`http://localhost/chatroom/:${roomId}`);
            const socket = await io(SOCKET_URL);
            socket.on("connect", () => {
              console.log("connected " + socket.id);
            });
            socket.on("welcome", (e) => {
              console.log(e);
            });
            socket.on("roomcreated", (e) => {
              console.log(e);
              setShareLink(`${FRONTEND_URL}/chatroom/${roomId}`);
              // navigate(`/Chatroom/?roomId`);
            });
          }}
          style={{ alignContent: "center", backgroundColor: "black" }}
          variant="contained"
        >
          Create room
        </Button>
      </Card>
    </div>
  );
}
export default ChatRoom;
