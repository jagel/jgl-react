// #region Imports
// React and external libraries
import { mdiButtonCursor, mdiChartBar, mdiHome } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
// #endregion Imports


export interface AppRoutes {
    name: React.ReactNode;
    path: string;
    hideInNavigation?:boolean;
    icon?: React.ReactNode;
}

/**  Routes definitions for breadcrumbs creation */
export const authRoutes : Record<string, AppRoutes> = {
    root: { name:'Home', path:'/', icon: <Icon path={mdiHome} size={1} /> } as AppRoutes,
    tablePage: { name:'Table', path:'/table-example', icon: <Icon path={mdiChartBar} size={1} /> } as AppRoutes,
    buttonsShowcase: { name:'Buttons Showcase', path:'/buttons-showcase', icon: <Icon path={mdiButtonCursor} size={1} /> } as AppRoutes,
}