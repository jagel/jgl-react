// #region Imports
import { lazy, useMemo } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

// Internal modules and components
import { authRoutes } from './app-setup/app-routing';

// Pages
const AppHome = lazy(() => import("./app-module/app-home"));
const AppLayout = lazy(() => import("./app-module/app-layout"));
const JglTableExample = lazy(() => import("./table/jgl-table-example"));
const AppErrorPage = lazy(() => import("./app-module/app-error-page"));

// Styles
import './App.css'
// #endregion Imports

function App() {
	//#region Initializations
    const isAuthenticated = true; // Placeholder for actual authentication logic
    const routesDef = authRoutes;
    const routes = useMemo( () : RouteObject[] =>( 
        !isAuthenticated ? 
        // Unauthenticated routes
        [{
            path: "*",
            element: <AppErrorPage title="404: Page Not Found" message="Unauthenticated pages are not implemented" />
        }] :
        // Authenticated routes
        [{
            path: "/",
            element: <AppLayout />,

            children: [{
                index: true,
                element: <AppHome />
            },{
                path: routesDef.tablePage.path,
                element: <JglTableExample />
            },{
                path: "*",
                element: <AppErrorPage title="404: Page Not Found" message="Sorry, the page you are looking for does not exist." />
            }]
        }])
    , [isAuthenticated]); // Recompute routes only when authentication status changes

    // Memoized router instance based on the routes array
    const router = useMemo( () => createBrowserRouter(routes), [routes] );

    //#endregion Initializations

    // #region Render
    return (
        <>
		    <RouterProvider router={router} />
        </>
    )
    // #endregion Render
}

export default App
