import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import { Button, Grid, Typography } from "@mui/material";
import { CentralizedCard } from "./CentralizedCard";
import { Video } from "./Video";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { FRONTEND_URL, SOCKET_URL, URL } from "../assets/link";
import videoMeetingIMg from "../assets/VideoMeeting.png";
import streamImg from "../assets/streamImg.png";
import meetingImg from "../assets/meetingImg.png";
import ChatRoomImg from "../assets/chatRoomImg.png";
import joinCallImg from "../assets/joinCallImg.png";
import screenshared_enabled from '../assets/screenshared_enabled.png'
import screenshared_disabled from '../assets/screenshred_disabled.png'
import videoshare_enabled from '../assets/videoshare_enabled.png'
import videoshare_disabled from '../assets/videoshare_disbled.png'
import micshare_enabled from '../assets/micshare_enabled.png'
import micshare_disabled from '../assets/micshare_disabled.png'
import call_disconnect from '../assets/disconnet.png'


let pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
});

export function FinalVideoChat() {
    const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [videoStream, setVideoStream] = useState();
  const [remoteVideoStream, setRemoteVideoStream] = useState();
  const userLoading = useRecoilValue(isUserLoading);
   const [audioStream, setAudioStream] = useState();
   const [micState, setMicState] = useState(true);
   const [videoState, setVideoState] = useState(true);
   const [otherUserVIdeo,setOtherUserVIdeo]=useState()
   const [screenState, setScreenState] = useState(true);
   const userEmail = useRecoilValue(userEmailState);
  //  const [micStatus,setMicStatus] = useState(true)
  const params = useParams();
  const roomId = params.roomId;
 useEffect(() => {
     if (!userLoading && !userEmail) {
       navigate("/"); // Redirect only when not loading and email is not available
     }
    
    
 }, [userLoading, userEmail, navigate]);

  useEffect(() => {
    const s = socketIO.connect(SOCKET_URL);
    s.on("connect", () => {
      setSocket(s);
      s.emit("join", {

        roomId,
      });
try{
 window.navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then(async (stream) => {
          setVideoStream(stream);
          setOtherUserVIdeo(stream)
          // setAudioStream(stream)
        });
}catch (error){
  console.log("please allow permissions")
}
     

      s.on("localDescription", async ({ description }) => {
        // Receiving video -
        console.log({ description });
        pc.setRemoteDescription(description);
        pc.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        s.on("iceCandidate", ({ candidate }) => {
          pc.addIceCandidate(candidate);
        });

        pc.onicecandidate = ({ candidate }) => {
          s.emit("iceCandidateReply", { candidate });
        };
        await pc.setLocalDescription(await pc.createAnswer());
        s.emit("remoteDescription", { description: pc.localDescription });
      });
      s.on("remoteDescription", async ({ description }) => {
        // Receiving video -
        console.log({ description });
        pc.setRemoteDescription(description);
        console.log("haa coming")
        pc.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        s.on("iceCandidate", ({ candidate }) => {
          pc.addIceCandidate(candidate);
        });

        pc.onicecandidate = ({ candidate }) => {
          s.emit("iceCandidateReply", { candidate });
        };

        //s.emit("remoteDescription", { description: pc.localDescription });
      });
    });


  }, []);
  const shareScreenfunc = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        // Replace the current video stream with the screen sharing stream
        setVideoStream(screenStream);
        setOtherUserVIdeo(screenStream);

        // Add the screen sharing stream to the peer connection
        pc.addTrack(screenStream.getTracks()[0]);

        // Handle ending of screen sharing
        screenStream.onended = () => {
          // Replace screen sharing stream with the original video stream
          setVideoStream(userStream.current);
          setOtherUserVIdeo(userStream.current);
          pc.addTrack(userStream.current.getTracks()[1]); // Add back the video track
        };
      })
      .catch((error) => {
        console.error("Error sharing screen:", error);
      });
  };





  let buttons = [
    {
      title: "share screen",
      state: screenState,
      enableimg: screenshared_enabled,
      disableimg: screenshared_disabled,
      onClick: shareScreenfunc
    },
    {
      title: "stop video",
      state: videoState,
      enableimg: videoshare_enabled,
      disableimg: videoshare_disabled,
      onClick: () => {
      





        if (videoState) {
          window.navigator.mediaDevices
            .getUserMedia({
              video: false,
              audio: micState,
            })
            .then(async (stream) => {
              setVideoStream(stream);
              
              pc.addTrack(stream.getVideoTracks()[0]);

              // setAudioStream(stream)
            });
          setVideoState(false);
        } else {
          window.navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: micState,
            })
            .then(async (stream) => {
              setVideoStream(stream);
              // setAudioStream(stream)
            });
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
          window.navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: false,
            })
            .then(async (stream) => {
              setVideoStream(stream);
              // setAudioStream(stream)
            });
          setMicState(false);
        } else {
          window.navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: true,
            })
            .then(async (stream) => {
              setVideoStream(stream);
              setOtherUserVIdeo(stream)
              // setAudioStream(stream)
            });
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

  if (!videoStream) {
    return <div>Loading...</div>;
  }

  if (!meetingJoined) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <CentralizedCard>
          <div>
            <Typography textAlign={"center"} variant="h5">
              Hi welcome to meeting {roomId}.
            </Typography>
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={async () => {
                // sending pc
                pc.onicecandidate = ({ candidate }) => {
                  socket.emit("iceCandidate", { candidate });
                };
                pc.addTrack(otherUserVIdeo.getVideoTracks()[0]);
                try {
                  await pc.setLocalDescription(await pc.createOffer());
                  console.log({ aa: pc.localDescription });
                  socket.emit("localDescription", {
                    description: pc.localDescription,
                  });
                } catch (err) {
                  console.log({ msg: err?.message });
                  console.error(err);
                }

                // socket.on("remoteDescription", async ({description}) => {
                //     await pc.setRemoteDescription(description);
                // });
                // socket.on("iceCandidateReply", ({candidate}) => {
                //     pc.addIceCandidate(candidate)
                // });
                setMeetingJoined(true);
              }}
              disabled={!socket}
              variant="contained"
            >
              Join meeting
            </Button>
          </div>
        </CentralizedCard>
      </div>
    );
  }
  console.log({ remoteVideoStream, videoStream });
  return (
    <div style={{ display: "flex", flexDirection: "column",margin:"0 auto" }}>
      <div>
        <Grid
          container
          spacing={2}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={6} lg={5}>
            my
            <Video stream={videoStream} />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            yours
            <Video stream={remoteVideoStream} />
          </Grid>
        </Grid>
      </div>
      <div style={{  display: "flex",margin:"0 auto ", }}>
        {buttons.map((button,index) => (
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
                margin:"0px 10px",
                alignItems: "center",
              }}
            >{button.state?
              <img
                style={{ maxWidth: "40px", opacity: "0.8" }}
                src={button.enableimg}
                alt=""
              />:
              <img
                style={{ maxWidth: "40px", opacity: "0.8" }}
                src={button.disableimg}
                alt=""
              />}
              <div style={{ marginTop: "10px", fontSize: " 1em" }}>
                {button.title}
              </div>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}
