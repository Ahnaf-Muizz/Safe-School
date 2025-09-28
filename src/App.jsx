import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button, TextField, Paper, AppBar, Toolbar, IconButton, Switch, List, ListItem, ListItemText, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from './assets/logo.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EmergencyIcon from '@mui/icons-material/ReportProblem';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function Login({ onLogin }) {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Updated credentials for each role (from UI)
  const credentials = {
    school: { username: 'Tom', password: 'school123' },
    parent: { username: 'Mandi', password: 'parent123' },
    student: { username: 'Ahnaf', password: 'student123' },
  };

  // Error state for invalid login
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!role || !username || !password) return;
    if (
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      setError('');
      onLogin(role);
    } else {
      setError('Invalid username or password for selected role.');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'transparent',
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      transition: 'background 0.8s',
    }}>
      <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#181818', color: '#fff', borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)' }}>
          <img src={logo} alt="Safe Schools Logo" style={{ width: 150, height: 150, marginBottom: 4 }} />
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1 }}>Safe School Login</Typography>
          <Box sx={{ width: '100%', mb: 2 }}>
              <Typography variant="subtitle2" align="center" sx={{ color: '#bfe9ff', fontWeight: 500, mb: 1, letterSpacing: 0.5, fontSize: '0.95rem' }}>
                Select your role:
              </Typography>
            <Tabs
              value={role}
              onChange={(_, v) => setRole(v)}
              centered
              sx={{ width: '100%', bgcolor: 'rgba(34,34,34,0.7)', borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(191,233,255,0.08)', mb: 1 }}
              textColor="inherit"
              indicatorColor="primary"
              TabIndicatorProps={{ style: { background: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)' } }}
            >
              <Tab label="School Admin" value="school" sx={{ color: '#fff', fontWeight: 500, fontSize: '1.05rem', px: 1 }} />
        <Tab label="Parent" value="parent" sx={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem', px: 1 }} />
        <Tab label="Student" value="student" sx={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem', px: 1 }} />
            </Tabs>
          </Box>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} InputLabelProps={{ style: { color: '#bbb' } }} inputProps={{ style: { color: '#fff' } }} sx={{ bgcolor: '#222', borderRadius: 1 }} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} InputLabelProps={{ style: { color: '#bbb' } }} inputProps={{ style: { color: '#fff' } }} sx={{ bgcolor: '#222', borderRadius: 1 }} />
          {error && <Typography variant="body2" sx={{ color: '#ff1744', mt: 1 }}>{error}</Typography>}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 600, fontSize: '1.1rem', py: 1.2, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)' }} disabled={!role || !username || !password} onClick={handleLogin}>
            Login
          </Button>
          <Box sx={{ mt: 2, color: '#bbb', fontSize: '0.95em', textAlign: 'center' }}>
            <div>School Admin: <b>Tom</b>/ <b>school123</b></div>
            <div>Parent: <b>Mandi</b>/ <b>parent123</b></div>
            <div>Student: <b>Ahnaf</b>/ <b>student123</b></div>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

function Dashboard({ role, onLogout }) {
  // Triple-tap SOS button logic
  const [sosReported, setSosReported] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = React.useRef();
  const SilentSOSButton = () => (
    <Button
      variant="contained"
      sx={{ fontWeight: 700, fontSize: '1rem', borderRadius: 2, background: 'linear-gradient(90deg,#ff1744,#ff5252)', color: '#fff', boxShadow: '0 2px 8px 0 rgba(244,67,54,0.4)', transition: 'background 0.5s', textShadow: '0 0 8px #ff1744', minWidth: 180 }}
      disabled={sosReported}
      onClick={() => {
        if (sosReported) return;
        setTapCount(prev => {
          const newCount = prev + 1;
          if (newCount === 1) {
            tapTimeoutRef.current = setTimeout(() => setTapCount(0), 1000);
          }
          if (newCount === 3) {
            setSosReported(true);
            clearTimeout(tapTimeoutRef.current);
            setTapCount(0);
          }
          return newCount;
        });
      }}
    >
      {sosReported ? 'SOS Reported' : 'Send SOS'}
    </Button>
  );
  // Student safety status state
  const [studentSafe, setStudentSafe] = useState(true);

  const [tab, setTab] = useState(role);
  // Feature states
  const [safe, setSafe] = useState(true);
  const [attendance, setAttendance] = useState([
    { name: 'Ahnaf Chowdhury', present: true },
    { name: 'Ashtin Magjacot', present: false },
    { name: 'Dhani Servance', present: false },
    { name: 'Gabriella Balderas', present: true },
    { name: 'Juliana Salinas', present: true },
    { name: 'Lisa Anoka', present: false },
    { name: 'Shihad Miajee', present: false },
    { name: 'Sydney Drucker', present: false },
    
  ]);

  // Feature components
  const LocationTracking = () => {
    // Texas Tech University Innovation Hub, Lubbock, TX
    const location = { lat: 33.6012, lng: -101.8947 };
    const [popupOpen, setPopupOpen] = useState(true);
    return (
      <Box sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1s' }}>
        <Typography variant="h6" sx={{ color: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)', fontWeight: 700, mb: 1, background: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}><LocationOnIcon sx={{ color: '#90caf9', mr: 1 }} /> Location Tracking</Typography>
        <Typography variant="body2" sx={{ color: '#bfe9ff', fontWeight: 500 }}>GPS location: <b style={{ color: '#ff6e7f' }}>33.6012° N, 101.8947° W</b></Typography>
        <Typography variant="body2" sx={{ color: '#bfe9ff', fontWeight: 500, mt: 1 }}>
          Real-time location of student detected: Texas Tech University Innovation Hub
        </Typography>
        <Box sx={{ mt: 2, width: '100%', maxWidth: 400, height: 300, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.4)', position: 'relative' }}>
          <MapContainer center={location} zoom={17} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={location}>
              {/* Popup is still here for accessibility, but not required to click */}
              <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                Texas Tech University Innovation Hub
              </Popup>
            </Marker>
          </MapContainer>
          {/* Always show Innovation Hub label overlayed on the map */}
          <Box sx={{ position: 'absolute', bottom: 16, left: 0, width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
            <Paper elevation={3} sx={{ display: 'inline-block', px: 2, py: 1, bgcolor: '#2193b0', color: '#fff', fontWeight: 700, borderRadius: 2, opacity: 0.95 }}>
              Innovation Hub
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  };
  const SilentSOS = () => (
    <Box sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1.2s' }}>
      <Typography variant="h6" sx={{ color: '#ff1744', fontWeight: 700, mb: 1 }}><EmergencyIcon sx={{ color: '#ff1744', mr: 1 }} /> Silent SOS</Typography>
      <SilentSOSButton />
      <Typography variant="caption" display="block" sx={{ color: '#ff5252', mt: 1 }}>Triple tap to report SOS</Typography>
    </Box>
  );
  const FlagBullying = () => (
    <Box sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1.4s' }}>
      <Typography variant="h6" sx={{ color: '#ffd600', fontWeight: 700, mb: 1 }}><FlagIcon sx={{ color: '#ffd600', mr: 1 }} /> Non-emergency</Typography>
      <Button variant="outlined" sx={{ fontWeight: 700, fontSize: '1rem', borderRadius: 2, background: 'linear-gradient(90deg,#ffd600,#fffde7)', color: '#181818', boxShadow: '0 2px 8px 0 rgba(255,214,0,0.2)', transition: 'background 0.5s', border: 'none' }} onDoubleClick={e => e.target.innerText = 'Concern Reported!'}>Report Concern</Button>
      <Typography variant="caption" display="block" sx={{ color: '#ffd600', mt: 1 }}>Double-tap to report a concern</Typography>
    </Box>
  );
  // Shared notification state for status check
  const [notifSent, setNotifSent] = useState(false);
  const [studentNotif, setStudentNotif] = useState(false);
  const [showStudentPopup, setShowStudentPopup] = useState(false);
  const SafeStatus = () => (
    <Box sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1.6s' }}>
      <Typography variant="h6" sx={{ color: '#00e676', fontWeight: 700, mb: 1 }}><CheckCircleIcon sx={{ color: '#00e676', mr: 1 }} /> Safe Status</Typography>
      <Button
        variant="contained"
        sx={{ fontWeight: 700, fontSize: '1rem', borderRadius: 2, background: 'linear-gradient(90deg,#00e676,#bfe9ff)', color: '#181818', boxShadow: '0 2px 8px 0 rgba(0,230,118,0.2)', transition: 'background 0.5s', mt: 1 }}
        onClick={() => { setNotifSent(true); setStudentNotif(true); setShowStudentPopup(true); }}
        disabled={notifSent}
      >
        {notifSent ? 'Notification Sent!' : 'Send Status Notification'}
      </Button>
      <Typography variant="caption" display="block" sx={{ color: '#bfe9ff', mt: 1 }}>Sends a notification to the student to check on their status</Typography>
    </Box>
  );
  const RFIDAttendance = () => (
    <Box sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1.8s' }}>
      <Typography variant="h6" sx={{ color: 'linear-gradient(90deg,#bfe9ff,#ff6e7f)', fontWeight: 700, mb: 1, background: 'linear-gradient(90deg,#bfe9ff,#ff6e7f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}><RadioButtonCheckedIcon sx={{ color: '#bfe9ff', mr: 1 }} />Student Attendance:</Typography>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'rgba(34,34,34,0.95)', borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(191,233,255,0.2)' }}>
        {attendance.map((student, idx) => (
          <ListItem key={idx} sx={{ fontWeight: 600, transition: 'background 0.3s', bgcolor: student.present ? 'rgba(0,230,118,0.08)' : 'rgba(255,23,68,0.08)' }}>
            <ListItemText
              primary={<span style={{ color: '#fff', fontWeight: 700 }}>{student.name}</span>}
              secondary={
                <span style={{
                  color: student.present ? '#00e676' : '#ff1744',
                  fontWeight: 700,
                  fontSize: '1.05em',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  textShadow: student.present ? '0 0 8px #00e676' : '0 0 8px #ff1744',
                }}>
                  {student.present ? 'Present' : 'Absent'}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Tab content per role
  // Student notification bar (right side)
  const StudentNotification = () => (
    <>
      {studentNotif && (
        <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 1.2s' }}>
          <Paper elevation={4} sx={{ p: 2, bgcolor: '#bfe9ff', color: '#181818', borderRadius: 2, fontWeight: 700, boxShadow: '0 2px 8px 0 rgba(191,233,255,0.4)' }}>
            <CheckCircleIcon sx={{ color: '#00e676', mr: 1 }} />
            Attention: Please confirm your safety status now.
          </Paper>
        </Box>
      )}
      {/* Notification bar for student on right side */}
      {role === 'student' && (
        <Box sx={{ position: 'fixed', top: 80, right: 0, zIndex: 9999, height: 'auto', width: 320, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Paper elevation={6} sx={{ p: 2, bgcolor: '#00e676', color: '#181818', borderRadius: '8px 0 0 8px', fontWeight: 700, boxShadow: '0 4px 16px 0 rgba(0,230,118,0.4)', minWidth: 240, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon sx={{ color: '#fff', mr: 2, fontSize: 32 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>Safety Confirmation Needed</Typography>
              <Typography variant="body2" sx={{ color: '#181818', mt: 0.5 }}>Please respond: Are you safe? Your status is important.</Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );

  // Persistent notification bar for parent and school tabs
  const ParentNotificationBar = () => (
    role === 'parent' && (
      <Box sx={{ position: 'fixed', top: 80, right: 0, zIndex: 9999, height: 'auto', width: 320, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Paper elevation={6} sx={{ p: 2, bgcolor: '#ff1744', color: '#181818', borderRadius: '8px 0 0 8px', fontWeight: 700, boxShadow: '0 4px 16px 0 #ff174480', minWidth: 240, textAlign: 'left', display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmergencyIcon sx={{ color: '#fff', mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>SOS Reported</Typography>
            <Typography variant="body2" sx={{ color: '#181818', mt: 0.5 }}>A student has reported an SOS. Please check immediately.</Typography>
          </Box>
        </Paper>
        <Paper elevation={6} sx={{ p: 2, bgcolor: '#ffd600', color: '#181818', borderRadius: '8px 0 0 8px', fontWeight: 700, boxShadow: '0 4px 16px 0 #ffd60080', minWidth: 240, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
          <FlagIcon sx={{ color: '#fff', mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>Concern Reported</Typography>
            <Typography variant="body2" sx={{ color: '#181818', mt: 0.5 }}>A student has reported a concern. Please review.</Typography>
          </Box>
        </Paper>
      </Box>
    )
  );

  const SchoolNotificationBar = () => (
    role === 'school' && (
      <Box sx={{ position: 'fixed', top: 80, right: 0, zIndex: 9999, height: 'auto', width: 320, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Paper elevation={6} sx={{ p: 2, bgcolor: '#ff1744', color: '#181818', borderRadius: '8px 0 0 8px', fontWeight: 700, boxShadow: '0 4px 16px 0 #ff174480', minWidth: 240, textAlign: 'left', display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmergencyIcon sx={{ color: '#fff', mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>SOS Reported</Typography>
            <Typography variant="body2" sx={{ color: '#181818', mt: 0.5 }}>A student has reported an SOS. Please check immediately.</Typography>
          </Box>
        </Paper>
        <Paper elevation={6} sx={{ p: 2, bgcolor: '#ffd600', color: '#181818', borderRadius: '8px 0 0 8px', fontWeight: 700, boxShadow: '0 4px 16px 0 #ffd60080', minWidth: 240, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
          <FlagIcon sx={{ color: '#fff', mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>Concern Reported</Typography>
            <Typography variant="body2" sx={{ color: '#181818', mt: 0.5 }}>A student has reported a concern. Please review.</Typography>
          </Box>
        </Paper>
      </Box>
    )
  );

  const tabContent = {
    school: [<LocationTracking key="loc" />, <SafeStatus key="safe" />, <RFIDAttendance key="rfid" />],
    parent: [<LocationTracking key="loc" />, <SafeStatus key="safe" />],
    student: [
      <StudentNotification key="notif" />,
      <Box key="toggle" sx={{ mb: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 1.1s' }}>
        <Typography variant="h6" sx={{ color: studentSafe ? '#00e676' : '#ff1744', fontWeight: 700, mb: 1 }}>
          <CheckCircleIcon sx={{ color: studentSafe ? '#00e676' : '#ff1744', mr: 1 }} />
          Safety Status: {studentSafe ? 'Safe' : 'Not Safe'}
        </Typography>
        <Button
          variant="contained"
          sx={{ fontWeight: 700, fontSize: '1rem', borderRadius: 2, background: studentSafe ? 'linear-gradient(90deg,#00e676,#bfe9ff)' : 'linear-gradient(90deg,#ff1744,#ff5252)', color: '#181818', boxShadow: '0 2px 8px 0 rgba(0,230,118,0.2)', transition: 'background 0.5s', mt: 1 }}
          onClick={() => setStudentSafe(s => !s)}
        >
          {studentSafe ? 'Set as Not Safe' : 'Set as Safe'}
        </Button>
        <Typography variant="caption" display="block" sx={{ color: '#bfe9ff', mt: 1 }}>
          Toggle your safety status for school authority and parent view
        </Typography>
      </Box>,
      <LocationTracking key="loc" />, <SilentSOS key="sos" />, <FlagBullying key="bully" />
    ],
  };

  // Only show the tab for the logged-in role
  const tabLabels = {
    school: 'School Authority',
    parent: 'Parent',
    student: 'Student',
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', transition: 'background 0.8s' }}>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
        <AppBar position="static" sx={{ mb: 2, bgcolor: '#181818', color: '#fff', borderRadius: 2, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)', width: '100%' }}>
          <Toolbar>
            <img src={logo} alt="Safe Schools Logo" style={{ width: 72, height: 72, marginRight: 24 }} />
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>Safe School Dashboard</Typography>
            <Button color="inherit" onClick={onLogout} sx={{ fontWeight: 600, fontSize: '1rem', borderRadius: 2 }}>Logout</Button>
          </Toolbar>
        </AppBar>
        <ParentNotificationBar />
        <SchoolNotificationBar />
        <Paper elevation={6} sx={{
          p: 4,
          width: '100%',
          bgcolor: 'rgba(24,24,24,0.95)',
          color: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backdropFilter: 'blur(4px)',
          transition: 'box-shadow 0.5s',
        }}>
          <Tabs value={role} centered sx={{ mb: 3, width: '100%' }} textColor="inherit" indicatorColor="primary" TabIndicatorProps={{ style: { background: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)' } }}>
            <Tab label={tabLabels[role]} value={role} sx={{ color: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)', fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(90deg,#ff6e7f,#bfe9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
          </Tabs>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 2 }}>
            {tabContent[role]}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('school');

  return loggedIn
    ? <Dashboard role={role} onLogout={() => setLoggedIn(false)} />
    : <Login onLogin={r => { setRole(r); setLoggedIn(true); }} />;
}

export default App
