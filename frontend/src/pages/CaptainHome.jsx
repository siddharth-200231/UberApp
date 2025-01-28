import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Divider,
  IconButton,
  Avatar,
  Chip,
  Grid,
  Stack,
  SvgIcon,
  useTheme
} from "@mui/material";
import { io } from "socket.io-client";
import { LocationOn, DirectionsCar, Notifications, Dashboard, AccountCircle, NetworkCheck } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const DashboardLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 280,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
}));

const MainContent = styled(Box)({
  flexGrow: 1,
});

const RideCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 32px rgba(0,0,0,0.12)'
  },
}));

const CaptainHome = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const theme = useTheme();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", { transports: ["websocket"] });
    socketRef.current.on("ride-request", (request) => {
      setRideRequests((prev) => [...prev, request]);
    });
    return () => socketRef.current?.disconnect();
  }, []);

  const RideRequestCard = ({ request, index }) => (
    <RideCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                  fontSize: '1.1rem'
                }}>
                  {request.rideType?.[0]?.toUpperCase() || "R"}
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  {request.rideType?.toUpperCase() || "AUTO"} RIDE
                </Typography>
                <Chip
                  label={`#${index + 1}`}
                  size="small"
                  sx={{ bgcolor: theme.palette.action.selected, ml: 'auto' }}
                />
              </Box>

              <Divider />

              <Box display="flex" gap={3}>
                <Stack spacing={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <SvgIcon component={LocationOn} color="primary" fontSize="small" />
                    <div>
                      <Typography variant="caption" color="text.secondary">PICKUP</Typography>
                      <Typography variant="body1">{request.pickup}</Typography>
                    </div>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <SvgIcon component={LocationOn} color="error" fontSize="small" />
                    <div>
                      <Typography variant="caption" color="text.secondary">DESTINATION</Typography>
                      <Typography variant="body1">{request.destination}</Typography>
                    </div>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2} justifyContent="space-between" height="100%">
              <Box>
                <Typography variant="caption" color="text.secondary">ESTIMATED</Typography>
                <Typography variant="h6" fontWeight={600}>8-12 mins</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">FARE</Typography>
                <Typography variant="h6" fontWeight={600}>₹{Math.floor(Math.random() * 500) + 100}</Typography>
              </Box>
              <Chip
                label="Accept Ride"
                color="primary"
                clickable
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: theme.palette.primary.dark }
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </RideCard>
  );

  return (
    <DashboardLayout>
      <Sidebar>
        <Box mb={4}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            DriveWave
          </Typography>
          <Divider />
        </Box>

        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: 'pointer' }}>
            <Dashboard fontSize="small" />
            <Typography variant="body1">Dashboard</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: 'pointer' }}>
            <DirectionsCar fontSize="small" />
            <Typography variant="body1">Rides</Typography>
            <Chip label={rideRequests.length} size="small" sx={{ ml: 'auto' }} />
          </Box>
          <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: 'pointer' }}>
            <AccountCircle fontSize="small" />
            <Typography variant="body1">Profile</Typography>
          </Box>
        </Stack>
      </Sidebar>

      <MainContent>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Ride Dashboard
            </Typography>
            
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                icon={<NetworkCheck fontSize="small" />}
                label="Online"
                color="success"
                variant="outlined"
              />
              <IconButton>
                <Notifications />
              </IconButton>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>JD</Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Stack spacing={3}>
                {rideRequests.map((request, index) => (
                  <RideRequestCard key={index} request={request} index={index} />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card sx={{ bgcolor: 'background.paper', borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Statistics</Typography>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Total Rides</Typography>
                      <Typography fontWeight={600}>142</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Today's Earnings</Typography>
                      <Typography fontWeight={600}>₹2,850</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Rating</Typography>
                      <Typography fontWeight={600}>4.92 ★</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </MainContent>
    </DashboardLayout>
  );
};

export default CaptainHome;