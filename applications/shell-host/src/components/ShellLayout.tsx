import React, { useEffect, useState } from 'react';
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
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  // Define paths where toolbar should be hidden
  const hiddenToolbarPaths = [
    '/login',
    '/register', 
    '/auth',
    '/error',
    '/404',
    '/react-demo'
    // Add more paths as needed
  ];

  // Router listener to determine toolbar visibility
  useEffect(() => {
    console.log('Current Path:', location.pathname);
    const shouldHideToolbar = hiddenToolbarPaths.some(path => 
      location.pathname.startsWith(path)
    );
    
    setIsToolbarVisible(!shouldHideToolbar);
  }, [location.pathname]);

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isToolbarVisible && (
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
      )}
      
      <Box sx={{ flexGrow: 1, p: isToolbarVisible? 3:0 }}>
        <Outlet />
      </Box>
      
    </Box>
  );
};

export default ShellLayout;