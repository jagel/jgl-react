import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        },
        warning: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        }
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        primary: {
          main: '#90caf9',
          light: '#e3f2fd',
          dark: '#42a5f5',
        },
        secondary: {
          main: '#ce93d8',
          light: '#f3e5f5',
          dark: '#ab47bc',
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
        },
        success: {
          main: '#66bb6a',
          light: '#81c784',
          dark: '#388e3c',
        },
        info: {
          main: '#29b6f6',
          light: '#4fc3f7',
          dark: '#0288d1',
        },
        warning: {
          main: '#ffa726',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        }
      }
    }
  },
});

