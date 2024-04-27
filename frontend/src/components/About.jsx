import React from "react";
import { Container, Typography, Link, Grid, Card } from "@mui/material";
import linkedinIMg from '../assets/linkedin.svg'
import githubIMg from '../assets/github.svg'
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
        {[
          {
            name: "Lingampally Shravan kumar",
            rollno: "23N35A6711",
            linkedinUrl: "https://www.linkedin.com/in/shravankumar8/",
            githubUrl: "https://github.com/shravankumar8",
          },
          {
            name: "Md Salahuddin Rehan Mustafa",
            rollno: "22N31A67A6",
            linkedin: "https://www.linkedin.com/in/shravankumar8/",
          },
          {
            name: "Pandaga Bhoomika",
            rollno: "22N31A67C6",
            linkedin: "https://www.linkedin.com/in/shravankumar8/",
          },
        ].map((member) => (
          <Grid item key={member}>
            <Card
              style={{
                backgroundColor: "#F5F5F5",
                padding: "40px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                {member.name}
              </Typography>

              <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                {member.rollno}
              </Typography>

              <br />
              <div style={{display:"flex",gap:"10px"}}>
                <Link href={member.linkedin} variant="body2" align="center">
                  <img style={{ width: "30px" }} src={linkedinIMg} alt="" />
                </Link>
                <Link href={member.githubUrl} variant="body2" align="center">
                  <img style={{ width: "30px" }} src={githubIMg} alt="" />
                </Link>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
