// #region Imports
// React and external libraries
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy } from "react";

// Pages
const AppHome = lazy(() => import("../app-module/app-home"));
const AppLayout = lazy(() => import("../app-module/app-layout"));
const JglTableExample = lazy(() => import("../table/jgl-table-example"));
const AppErrorPage = lazy(() => import("../app-module/app-error-page"));
// #endregion Imports

export const appRouterObject: RouteObject[] = [
    {
        path: "/",
        element: <AppLayout />,

        children: [{
            index: true,
            element: <AppHome />
        },{
            path: "table-example",
            element: <JglTableExample />
        },{
            path: "*",
            element: <AppErrorPage title="404: Page Not Found" message="Sorry, the page you are looking for does not exist." />
        }]

    },
    
];


export const useAppRoutes = () => {
	return createBrowserRouter(appRouterObject);
} 