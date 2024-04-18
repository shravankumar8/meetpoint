import React from "react";
import { Container, Typography, Link, Grid } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        About MeetPoint
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        MeetPoint is a student-led industrial-oriented project backed by the
        institution MRCET. Our main goal is to enhance user experience in remote
        collaboration.
      </Typography>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {[1, 2, 3].map((member) => (
          <Grid item key={member}>
            <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
              Lingampally Shravan Kumar
            </Typography>
            <Link href="/shravankumar8" variant="body2" align="center">
              /shravankumar8
            </Link>
            <br />
            <Link href="/in/shravankumar8/" variant="body2" align="center">
              /in/shravankumar8/
            </Link>
            <br />
            <Link href="/Shravankumar8_" variant="body2" align="center">
              /Shravankumar8_
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
