// #region Imports
// React and external libraries
import React, { useMemo } from 'react';

// MUI Components and Icons
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

// Internal imports
import { theme } from './styles/theme';
import ButtonsShowcase from './buttons/buttons-showcase';
import { createBrowserRouter, RouteObject, Outlet, RouterProvider } from 'react-router-dom';
import Box from '@mui/material/Box';

import { MenuListItem } from '@jgl-mui/components';

import AppErrorPage from '@app/pages/app-error.page';
import AppLayout from '@app/components/app-layout';
import { MenuList } from '@mui/material';
// import MenuListItem from '../../../workspaces/react-shared/jgl-mui/src/components/menu-list-item';
// import { MenuListItem } from '@jgl-mui/components';
// import AppErrorPage from './pages/app-error.page';
// #endregion Imports

import ListItem from '@mui/material/ListItem';

const TestComponent1 = () => {
    return <label>Hi</label>
    // return <MenuList>
    //   <MenuListItem>Test Component 1 - Item 1</MenuListItem>
    // </MenuList>

};

const TestComponent2 = ({ text }: { text: string }) => {
    return <div>Test Component 2 {text}</div>;
};

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
                    element: <TestComponent1 />
                }, {
                    path: 'test2',
                    element: <TestComponent2 text={'test2'} />
                }
                    // ,{
                    //   path: `${basePath}/test2`,
                    //   element: <TestComponent2 />
                    // },{
                    //   path: `test2`,
                    //   element: <TestComponent2 />
                    // }
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