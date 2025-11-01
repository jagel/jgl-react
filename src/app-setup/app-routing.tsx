// #region Imports
// React and external libraries
import { createBrowserRouter, RouteObject } from "react-router-dom";

// Pages
import AppHome from "../app-module/app-home";
import AppLayout from "../app-module/app-layout";
import JglTableExample from "../table/jgl-table-example";
import AppErrorPage from "../app-module/app-error-page";

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