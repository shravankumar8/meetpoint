import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Card, Typography, TextField, Button, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import socketIO from "socket.io-client";
import { FRONTEND_URL, SOCKET_URL, URL } from "../assets/link";
import { Video } from "./Video";
import screenshared_enabled from "../assets/screenshared_enabled.png";
import screenshared_disabled from "../assets/screenshred_disabled.png";
import videoshare_enabled from "../assets/videoshare_enabled.png";
import videoshare_disabled from "../assets/videoshare_disbled.png";
import micshare_enabled from "../assets/micshare_enabled.png";
import micshare_disabled from "../assets/micshare_disabled.png";
import call_disconnect from "../assets/disconnet.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io();

function Stream() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = socketIO.connect(SOCKET_URL);
    s.on("connect", () => {
      setSocket(s);
    });
  });

  const notify = () => toast("Joined meeting successfully!");
  const [micState, setMicState] = useState(true);
  const [ytKey, setYtKey] = useState();
  const textFieldRef = useRef(null);
  const [streamVideo, setStreamVideo] = useState();
  const [screenState, setScreenState] = useState(false);
  const [videoState, setVideoState] = useState(true);
  function shareScreenfunc() {
    console.log("hii");
  }
  function startStreaming() {
    try {
      console.log("Streaming started");
      const mediaRecorder = new MediaRecorder(streamVideo, {
        videoBitsPerSecond: 2500000,
        audioBitsPerSecond: 1280000,
        frameRate: 30,
      });

      mediaRecorder.start(25);
      notify;
      mediaRecorder.ondataavailable = (e) => {
        //  messageNotify("started streaming to youtube");
        let obj = {
          data: e.data,
          ytLink: ytKey,
        };
      
        console.log("Media data available");
        socket.emit("binarystream", obj);
        // Handle the binary stream data here (e.g., save to a file)
      };
    } catch (error) {
      console.error("Error starting streaming:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  }

  let buttons = [
    {
      title: "share screen",
      state: screenState,
      enableimg: screenshared_enabled,
      disableimg: screenshared_enabled,
      onClick: shareScreenfunc,
    },
    {
      title: "stop video",
      state: videoState,
      enableimg: videoshare_enabled,
      disableimg: videoshare_disabled,
      onClick: () => {
        if (videoState) {
          setVideoState(false);
        } else {
          setVideoState(true);
        }
      },
    },
    {
      title: "Mute",
      enableimg: micshare_enabled,
      disableimg: micshare_disabled,
      state: micState,
      onClick: () => {
        if (micState) {
          setMicState(false);
        } else {
          setMicState(true);
        }
      },
    },
    {
      title: "Disconnect",
      state: true,
      enableimg: call_disconnect,
      disableimg: call_disconnect,

      onClick: () => {
        console.log("share screen");
      },
    },
  ];


  if (ytKey) {
    
   
   


    return (
      <div>
        <div style={{ maxWidth: "40%", margin: "auto auto " }}>
          <Video stream={streamVideo} Audiomuted={true} />
        </div>

        <div
          style={{
            display: "flex",
            margin: "0 auto ",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {buttons.map((button, index) => (
            <Grid key={index} item xs={6} sm={3} md={2}>
              <div
                onClick={button.onClick}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "36px",
                  maxWidth: "200px",
                  padding: "10px",
                  margin: "0px 10px",
                  alignItems: "center",
                }}
              >
                {button.state ? (
                  <img
                    style={{ maxWidth: "40px", opacity: "0.8" }}
                    src={button.enableimg}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ maxWidth: "40px", opacity: "0.8" }}
                    src={button.disableimg}
                    alt=""
                  />
                )}
                <div style={{ marginTop: "10px", fontSize: " 1em" }}>
                  {button.title}
                </div>
              </div>
            </Grid>
          ))}
        </div>
        <div
          style={{
            margin: "10px auto ",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={startStreaming}
            size="large"
            style={{ alignContent: "center", backgroundColor: "black" }}
            variant="contained"
          >
            Start Streaming to youtube
          </Button>
        </div>
      </div>
    );
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
        <Typography variant={"h5"}>youtube stream key</Typography>
        <br />
        <br />
        <TextField
          onChange={(e) => {
            // setYtKey(e.target.value);
          }}
          inputRef={textFieldRef}
          fullWidth={true}
          label="youtube key"
          variant="outlined"
          required
        ></TextField>

        <br />
        <br />
        <br />
        <Button
          onClick={async () => {
            window.navigator.mediaDevices
              .getUserMedia({
                video: true,
                audio: true,
              })
              .then(async (stream) => {
                setStreamVideo(stream);
                // setOtherUserVIdeo(stream);
                // setAudioStream(stream)
              });

            setYtKey(textFieldRef.current.value);
            // This will log the value of ytKey to the console
            // You can perform other actions with ytKey here
          }}
          style={{ alignContent: "center", backgroundColor: "black" }}
          variant="contained"
        >
          start streaming
        </Button>
      </Card>
    </div>
  );
}
export default Stream;
