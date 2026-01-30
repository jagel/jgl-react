import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import  Paper  from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import DemoLayout from './components/DemoLayout';
import ButtonsShowcase from './buttons/buttons-showcase';
import { createBrowserRouter, RouteObject, Outlet, RouterProvider } from 'react-router-dom';
import Box from '@mui/material/Box';
import { MenuList, ListItem } from '@mui/material';
import { MenuListItem } from '@jgl-mui/components';

const TestComponent1 = () => {
  // return <label></label>
  return <MenuList>
    <ListItem>Test Component 1 - Item 1</ListItem>
  </MenuList>;
};

const TestComponent2 = () => {
  return <div>Test Component 2</div>;
};

const AppLayout: React.FC = () => {
 
  return <>
  <Box>
    hellooo
    <Outlet />
  </Box>
  </>
}


const ReactDemoApp: React.FC = () => {
const isAuthenticated = true;
  const routes = useMemo((): RouteObject[] => (
    !isAuthenticated ?
        // Unauthenticated routes
        [{
            path: "*",
            element: <ButtonsShowcase />,
        }] :
        // Authenticated routes
        [{
            path: "react-demo/",
            element: <AppLayout />,

            children: [{
                index: true,
                element: <TestComponent1 />
            }, {
                path: 'test2',
                element: <TestComponent2 />
            }]
        }])
    , [isAuthenticated]); // Recompute routes only when authentication status changes

// Memoized router instance based on the routes array
const router = useMemo(() => createBrowserRouter(routes), [routes]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
      <CssBaseline />
      <DemoLayout>
      <RouterProvider router={router} />
      </DemoLayout>
      </Paper>
    </ThemeProvider>
  );
};

export default ReactDemoApp;