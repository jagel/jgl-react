// #region Imports
import { lazy, useMemo } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { theme } from './styles/theme';

// MUI
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';

// Internal modules and components
import { authRoutes } from './app-setup/app-routing';
import { AppContextStages } from './app-setup/app-context-stages';

// Pages
const AppHome = lazy(() => import("./app-module/app-home"));
const AppLayout = lazy(() => import("./app-module/app-layout"));
const JglTableExample = lazy(() => import("./table/jgl-table-example"));
const AppErrorPage = lazy(() => import("./app-module/app-error-page"));
const ButtonsShowcasePage = lazy(() => import("./buttons/buttons-showcase"));

// Styles
import './App.css'
// #endregion Imports

function App() {
    //#region Initializations
    const isAuthenticated = true; // Placeholder for actual authentication logic

    const routes = useMemo((): RouteObject[] => (
        !isAuthenticated ?
            // Unauthenticated routes
            [{
                path: "*",
                element: <AppErrorPage title="404: Page Not Found" message="Unauthenticated pages are not implemented" />,
            }] :
            // Authenticated routes
            [{
                path: "/",
                element: <AppLayout />,

                children: [{
                    index: true,
                    element: <AppHome />
                }, {
                    path: authRoutes.tablePage.path,
                    element: <JglTableExample />
                }, {
                    path: authRoutes.buttonsShowcase.path,
                    element: < ButtonsShowcasePage />
                }, {
                    path: "*",
                    element: <AppErrorPage title="404: Page Not Found" message="Sorry, the page you are looking for does not exist." />
                }]
            }])
        , [isAuthenticated]); // Recompute routes only when authentication status changes

    // Memoized router instance based on the routes array
    const router = useMemo(() => createBrowserRouter(routes), [routes]);

    //#endregion Initializations

    // TODO: Move ``theme`` definition to libray jgl-mui/src/theme/theme-provider.tsx, and rename it to jglThemePalette
    // TODO: Create Footer in library jgl-mui/src/layouts/footer.component.tsx
    return (
        <ThemeProvider theme={theme}> 
            <AppContextStages>
                <Paper style={{ minHeight: '100vh' }}>
                    <RouterProvider router={router} />
                </Paper>
            </AppContextStages>
        </ThemeProvider>
    )
    // #endregion Render
}

export default App
