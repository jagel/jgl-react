import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import DemoLayout from './components/DemoLayout';
import ButtonsShowcase from './buttons/buttons-showcase';

const ReactDemoApp: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DemoLayout>
        <ButtonsShowcase />
      </DemoLayout>
    </ThemeProvider>
  );
};

export default ReactDemoApp;