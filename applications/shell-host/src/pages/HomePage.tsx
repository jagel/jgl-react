import React from 'react';
import { 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to JGL Micro Frontend Platform
      </Typography>
      
      <Typography variant="h6" color="text.secondary" align="center" paragraph>
        A modern micro frontend architecture showcasing React components and development standards
      </Typography>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
                  React Demo MFE
                </Typography>
                <Chip label="Active" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Showcase of React components, Material-UI integration, and development patterns. 
                Includes buttons, tables, and interactive demonstrations.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                component={Link} 
                to="/react-demo"
                variant="contained"
              >
                Open React Demo
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
                  Angular Demo MFE
                </Typography>
                <Chip label="Coming Soon" color="default" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Future Angular-based micro frontend for demonstrating Angular components 
                and development standards. Will showcase Angular Material and best practices.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" disabled>
                Coming Soon
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Architecture Overview
        </Typography>
        <Typography variant="body1" paragraph>
          This platform demonstrates a micro frontend architecture using Module Federation with Vite. 
          Each micro frontend can be developed, tested, and deployed independently while sharing 
          common dependencies and maintaining a consistent user experience.
        </Typography>
        <Typography variant="body1">
          <strong>Current Features:</strong>
        </Typography>
        <Box component="ul" sx={{ mt: 1 }}>
          <li>Independent development and deployment of micro frontends</li>
          <li>Shared React and Material-UI dependencies</li>
          <li>Centralized shell for navigation and layout</li>
          <li>Error boundaries for micro frontend isolation</li>
          <li>Development tooling for concurrent development</li>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;