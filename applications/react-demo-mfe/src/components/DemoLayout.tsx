import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { mdiReact } from '@mdi/js';
import Icon from '@mdi/react';

interface DemoLayoutProps {
  children: React.ReactNode;
}

const DemoLayout: React.FC<DemoLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Icon path={mdiReact} size={1.5} style={{ marginRight: '16px', color: '#61dafb' }} />
          <Typography variant="h4" component="h1">
            React Component Demo
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          This micro frontend demonstrates React component standards and best practices.
        </Typography>
      </Paper>
      
      <Box>
        {children}
      </Box>
    </Box>
  );
};

export default DemoLayout;