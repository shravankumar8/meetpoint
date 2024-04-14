import React from "react";
import { Grid, Paper } from "@mui/material";
import LandingPageImage from "../assets/landingpage.png";
export function LandingPage() {
  return (
    <Grid style={{ margin: "40px" }} container spacing={2}>
      {/* Left side text */}
      <Grid item xs={12} md={6}>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: "55px", fontWeight: "bold" }}>
            Video calls with anyone, anywhere
          </div>
          <div style={{ fontSize: "25px", fontWeight: "200" }}>
            Stay connected and collaborate with friends, family, and colleagues
            no matter where you are.
          </div>
        </div>
      </Grid>
      {/* Right side image */}
      <Grid item xs={12} md={6}>
        <div style={{ padding: 20 }}>
          <div>
            <img style={{ width: "550px" }} src={LandingPageImage} alt="" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
