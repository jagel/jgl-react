// #region Imports
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import { theme } from './styles/theme';

// Shell Layout
import ShellLayout from './components/ShellLayout';
import HomePage from './pages/HomePage';
import MfeBoundary from './components/MfeBoundary';

// Micro Frontend Imports
const ReactDemoMfe = React.lazy(() => import('react-demo-mfe/ReactDemoApp'));

// Styles
import './App.css'
// #endregion Imports

function App() {
    //#region Route Configuration
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <ShellLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'react-demo/*',
                    element: (
                        <MfeBoundary mfeName="React Demo">
                            <Suspense fallback={
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                                    <CircularProgress />
                                </Box>
                            }>
                                <ReactDemoMfe />
                            </Suspense>
                        </MfeBoundary>
                    )
                }
            ]
        }
    ];

    const router = createBrowserRouter(routes);
    //#endregion Route Configuration

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
