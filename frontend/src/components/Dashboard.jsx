import { useSetRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import videoMeetingIMg from '../assets/VideoMeeting.png'
import streamImg from '../assets/streamImg.png'
import meetingImg from '../assets/meetingImg.png'
import ChatRoomImg from "../assets/chatRoomImg.png";
import joinCallImg from '../assets/joinCallImg.png'
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isLoading";
import InitUser from "./initUser";

function Dashboard() {
 
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  // const setUser = useSetRecoilState(userState);
   

  useEffect(() => {
   console.log("user loading " + userLoading);
    console.log(userEmail)
    if (userLoading && !userEmail) {
      navigate("/"); // Redirect only when not loading and email is not available
    }
  }, [userLoading, userEmail, navigate]);

  if (!userEmail || userLoading) {
    // Return loading state or handle redirect when user email is not available
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        backgroundColor: "#D1D1D1",
        maxWidth: "90%",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "36px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[
          {
            title: "Create chat rooms",
            img: ChatRoomImg,
            location: "/chatroom",
          },
          {
            title: "Video chat",
            img: videoMeetingIMg,
            location: "/videochat",
          },
          {
            title: "Meeting",
            img: meetingImg,
            location: "/meeting",
          },
          {
            title: "Stream",
            img: streamImg,
            location: "/stream",
          },
          {
            title: "joinCall",
            img: joinCallImg,
            location: "/joincall",
          },
        ].map((index) => (
          <Grid key={index} item xs={6} sm={3} md={2}>
            <div
              onClick={() => {
                navigate(index.location);
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                borderRadius: "36px",
                maxWidth: "200px",
                padding: "10px",

                alignItems: "center",
              }}
            >
              <img
                style={{ maxWidth: "100px", opacity: "0.4" }}
                src={index.img}
                alt=""
              />
              <div style={{ marginTop: "10px", fontSize: " 1em" }}>
                {index.title}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
