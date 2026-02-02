// #region Imports
// React and external libraries
import React, { lazy, useMemo } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

// MUI Components and Icons
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';

// Internal imports
import AppErrorPage from '@app/pages/app-error.page';
import AppLayout from '@app/components/app-layout';
import { APP_ROUTES } from '@app/app-setup/app-routing';
// #endregion Imports

// Pages
// const AppHome = lazy(() => import("@app/pages/app-home.page"));
// const TableExample = lazy(() => import("@app/pages/table-example.page"));

import AppHome from '@app/pages/app-home.page'
import TableExample from '@app/pages/table-example.page'
import ButtonsShowcase from '@app/pages/buttons-showcase.page'
// const ButtonsShowcase = lazy(() => import("@app/pages/buttons-showcase.page")); TODO: Fix lazy loading with MFE

interface AppLayoutProps {
    basePath: string;
}

const ReactDemoApp: React.FC<AppLayoutProps> = 
// Default basePath to 'react-demo/' for MFE usage
({ basePath }: AppLayoutProps = { basePath: '/react-demo' }) => { 
    const isAuthenticated = true;
    
    const routes = useMemo((): RouteObject[] => (
        !isAuthenticated ?
            // Unauthenticated routes
            [{
                path: "*",
                element: <AppErrorPage title="404: Page Not Found" message="Unauthenticated pages are not implemented" />,
            }] :
            // Authenticated routes
            [{
                path: basePath,
                element: <AppLayout />,

                children: [{
                    index: true,
                    element: <AppHome />
                },{
                    path: APP_ROUTES.tablePage.path,
                    element: <TableExample />
                },{
                    path: APP_ROUTES.buttonsShowcase.path,
                    element: <ButtonsShowcase />
                }
                ]
            }])
        , [isAuthenticated]); // Recompute routes only when authentication status changes

    // Memoized router instance based on the routes array
    const router = useMemo(() => createBrowserRouter(routes), [routes]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default ReactDemoApp;