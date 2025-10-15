import React from 'react';
import { Box, Button, Typography, AppBar, Toolbar, Container, Paper } from '@mui/material';
import mascotImage from './assets/mascot.png';
import mainPic1 from './assets/main-pic1.jpg';
import mainPic2 from './assets/main-pic2.jpg';
import logo from './assets/logo.svg';

export default function WelcomePage({ onLoginClick }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      
      <AppBar position="absolute" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="primary" variant="contained" sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1, fontSize: { xs: '1rem', sm: '1.1rem' }, boxShadow: 2 }} onClick={onLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* The Container now handles horizontal centering and max-width. */}
      {/* Flexbox properties are used for vertical centering. */}
      <Container
        component="main"
        maxWidth="sm" // This sets a max-width and centers the container horizontally.
        sx={{
          flexGrow: 1, // Allows the container to grow and fill the vertical space.
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // This centers the Paper component vertically.
          alignItems: 'center',     // This centers the Paper component horizontally.
          py: { xs: 8, sm: 4 },     // Added padding top/bottom for spacing from edges.
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            width: '100%', // The paper will now fill the centered container.
            // maxWidth: 600 is no longer needed here as the Container handles it.
            bgcolor: 'rgba(24,24,24,0.92)',
            color: '#fff',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            backdropFilter: 'blur(2px)',
          }}
        >
    <img src={logo} alt="Safe Schools Logo" style={{ width: 300, height: 300, marginBottom: 1 }} />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: '#bfe9ff',
              textAlign: 'center',
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            Welcome to SafeSchool
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#ff6e7f',
              mb: 2,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
            }}
          >
            Your all-in-one school safety dashboard
          </Typography>
          
          {/* Our Why Section */}
<Box sx={{ width: '100%', bgcolor: 'rgba(191,233,255,0.10)', borderRadius: 2, mb: 2, p: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: 'background 0.3s', '&:hover': { bgcolor: 'rgba(191,233,255,0.18)' } }}>
  <Typography variant="h5" sx={{ color: '#bfe9ff', fontWeight: 700, mb: 3, textAlign: 'center' }}>
    Our Mission Statement
  </Typography>

  <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, fontSize: { xs: '1.1rem', sm: '1.2rem' }, textAlign: 'center', mb: 2 }}>
    SafeSchool wasn’t built to make noise. It was built to listen.
  </Typography>

  <Typography variant="body1" sx={{ color: '#bfe9ff', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
    We saw how phones and social apps filled our schools with distraction and distance. So we asked a simple question — what if there was something better? Something made for students, not against them.
  </Typography>

  <Typography variant="body1" sx={{ color: '#bfe9ff', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 3 }}>
    Because when you take something away from kids, you have to give them something meaningful to fill the silence — or they’ll find their own way to be heard.
  </Typography>

   <Typography variant="body1" sx={{ color: '#bfe9ff', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
    That’s where SafeSchool began — not from tragedy, but from care. From the belief that prevention should whisper before the world ever has to scream.
  </Typography>

  <Typography variant="body1" sx={{ color: '#bfe9ff', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
Our team is made up of students, educators, parents, dreamers, builders, and engineers —
people who believe every child’s voice deserves to be heard,
no matter how small the moment or how big the storm.  </Typography>

<Typography variant="body1" sx={{ color: '#ffd740', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
We’re not chasing reaction.
We’re building prevention —
one heartbeat, one classroom, one child at a time.  </Typography>

  <Typography variant="h6" sx={{ color: '#ff6e7f', fontWeight: 600, textAlign: 'center' }}>
    SafeSchool: Because sometimes… the silence of prevention speaks louder than the noise of reaction.
  </Typography>
</Box>
          
          {/* Mascot Picture Placeholder */}
<Box sx={{ width: '100%', minHeight: 120, bgcolor: 'rgba(255,215,64,0.10)', borderRadius: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: 'background 0.3s', '&:hover': { bgcolor: 'rgba(255,215,64,0.18)' } }}>
  <Typography variant="h6" sx={{ color: '#ffd740', fontWeight: 700, mb: 1 }}>Our Mascot: CELA</Typography>
  
      {/* 👇 This Box now displays your image */}
      <Box
        component="img"
        src={mascotImage}
        alt="School Mascot"
        sx={{
          height: '500px',         // Controls the image size
          width: 'auto',           // Adjusts width to maintain aspect ratio
          maxWidth: '90%',         // Ensures it doesn't overflow
          objectFit: 'contain',    // Makes sure the entire image is visible
        }}
      />
    </Box>

          
          {/* Main Picture Placeholder */}
<Box sx={{ width: '100%', bgcolor: 'rgba(255,110,127,0.10)', borderRadius: 2, mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: 'background 0.3s', '&:hover': { bgcolor: 'rgba(255,110,127,0.18)' } }}>
  <Typography variant="h6" sx={{ color: '#ff6e7f', fontWeight: 700, mb: 1 }}>Our Team at Red Raider Startup</Typography>
<Typography variant="body1" sx={{ color: '#fdfdfdff', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
Here are the faces behind the Compassion, Empathy, Listening, and Awareness (CELA)
that make SafeSchool what it is:
a family built on heart, purpose, and the belief that every voice matters.  </Typography>
  {/* This Box now stacks the two images vertically */}
  <Box sx={{
    display: 'flex',
    flexDirection: 'column', // <-- Key change for vertical stacking
    alignItems: 'center',    // Centers the images horizontally within this container
    gap: 2,                  // Adds vertical spacing between the images
    width: '100%',           // Ensure this container takes full width
    // Remove fixed height if you want images to determine container height
  }}>

    {/* Image 1 */}
    <Box
      component="img"
      src={mainPic1}
      alt="Main visual 1"
      sx={{
        width: '100%',           // Image takes full available width
        maxWidth: '500px',       // Optional: Set a max-width for very large screens
        height: 'auto',          // Let height adjust naturally to maintain aspect ratio
        objectFit: 'contain',    // Ensures the entire image is visible, might leave space
        // OR use 'cover' if you want it to fill and crop:
        // objectFit: 'cover', 
        borderRadius: '8px',
      }}
    />

    {/* Image 2 */}
    <Box
      component="img"
      src={mainPic2}
      alt="Main visual 2"
      sx={{
        width: '100%',
        maxWidth: '500px',       // Optional: Set a max-width
        height: 'auto',
        objectFit: 'contain',    // Or 'cover'
        borderRadius: '8px',
      }}
    />

  </Box>
</Box>

         {/* YouTube Video 1 Placeholder */}
<Box sx={{ width: '100%', bgcolor: 'rgba(0,230,118,0.10)', borderRadius: 2, mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
  <Typography variant="h6" sx={{ color: '#00e676', fontWeight: 700, mb: 1 }}>Cela the Calming Llama: Quiet Prevention, Big Impact</Typography>

  {/* Responsive container for the video */}
  <Box sx={{
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%', // This creates a 16:9 aspect ratio
    borderRadius: '8px',
  }}>
    <iframe
      src="https://www.youtube.com/embed/X9rnibNIYc4?si=pHRn8gXtPJkYUB_G" // <-- PASTE YOUR FIRST VIDEO'S EMBED URL HERE
      title="YouTube video player 1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  </Box>
</Box>
          {/* YouTube Video 2 Placeholder */}
<Box sx={{ width: '100%', bgcolor: 'rgba(33,147,176,0.10)', borderRadius: 2, mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
  <Typography variant="h6" sx={{ color: '#2193b0', fontWeight: 700, mb: 1 }}>Login Tutorial</Typography>

  {/* Responsive container for the video */}
  <Box sx={{
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
    borderRadius: '8px',
  }}>
    <iframe
      src="https://www.youtube.com/embed/7p-RRiRrAB4?si=5fi0qsxxkgw6Ps3e" // <-- PASTE YOUR SECOND VIDEO'S EMBED URL HERE
      title="YouTube video player 2"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  </Box>
</Box>

         
        </Paper>
      </Container>
    </Box>
  );
}
