import React from "react";
import { Typography, Grid, Button } from "@mui/material";

const Features = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        About MeetPoint
      </Typography>
      <Typography variant="body1" gutterBottom>
        MeetPoint is a student-led industrial-oriented project backed by the
        institution MRCET. Our motivation is to enhance user experience in
        remote collaboration.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Features:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Create Chat Rooms</Typography>
          <Typography variant="body2">
            Engage in text-based communication with other users in dedicated
            chat rooms.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Video Chat</Typography>
          <Typography variant="body2">
            Have real-time video conversations with one or more participants.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Meeting</Typography>
          <Typography variant="body2">
            Organize and conduct virtual meetings with scheduling, agendas, and
            participant management.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Stream</Typography>
          <Typography variant="body2">
            Broadcast live video or audio content for webinars, events, and
            presentations.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Join Call</Typography>
          <Typography variant="body2">
            Easily join ongoing calls or meetings with a single click.
          </Typography>
        </Grid>
      </Grid>

      {/* Button to navigate to team page */}
      <Button variant="contained" color="primary" href="/team">
        Learn About Our Team
      </Button>
    </div>
  );
};

export default Features;
