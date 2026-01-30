// #region Imports
import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

// MUI Imports
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';

// Shell Layout
import ShellLayout from './components/ShellLayout';
import HomePage from './pages/HomePage';
import MfeBoundary from './components/MfeBoundary';

import { theme } from './styles/theme';

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
                },{
                    path: 'react-demo/*',
                    element: (<MfeBoundary mfeName="React Demo">
                        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px"><CircularProgress /></Box>}>
                            <ReactDemoMfe basePath={"react-demo/"} />
                        </Suspense>
                    </MfeBoundary>)
                },{
                    path: 'login',
                    element: <div>Login Page Placeholder</div>
                }
            ]
        }
    ];

    const router = createBrowserRouter(routes);
    //#endregion Route Configuration

    return (<ThemeProvider theme={theme}>
            <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>);
}

export default App;
