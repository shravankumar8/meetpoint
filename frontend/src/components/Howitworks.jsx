import React from 'react';
import { Typography, Grid, Card, CardContent, CardHeader, List, ListItem, ListItemText } from '@mui/material';

const HowItWorks = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          MeetPoint Features Explained
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Create Chat Rooms" />
          <CardContent>
            <Typography variant="body1">
              MeetPoint allows users to create dedicated chat rooms for
              effective communication. Users can create multiple chat rooms
              based on projects, teams, or topics.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Video Chat" />
          <CardContent>
            <Typography variant="body1">
              MeetPoint's video chat feature enables face-to-face interactions
              in a virtual environment. Users can initiate video calls with
              individuals or groups, conduct virtual meetings, and host webinars
              seamlessly.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Meeting" />
          <CardContent>
            <Typography variant="body1">
              MeetPoint simplifies meeting management with its comprehensive
              meeting feature. Users can schedule meetings, set agendas, and
              send invitations to participants effortlessly.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Stream" />
          <CardContent>
            <Typography variant="body1">
              MeetPoint's stream feature allows users to share live content,
              such as presentations, webinars, or events, with a broader
              audience. It supports high-quality streaming and interactive
              engagement with viewers.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Join Call" />
          <CardContent>
            <Typography variant="body1">
              MeetPoint's join call feature enables users to join ongoing video
              calls or meetings seamlessly. Users can enter meeting rooms with a
              simple click, making collaboration and participation hassle-free.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};


export default HowItWorks;
