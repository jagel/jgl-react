import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  Button,
  Stack
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const ShellLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JGL Micro Frontend Platform
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              variant={location.pathname === '/' ? 'outlined' : 'text'}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/react-demo"
              variant={location.pathname.startsWith('/react-demo') ? 'outlined' : 'text'}
            >
              React Demo
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 2, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default ShellLayout;