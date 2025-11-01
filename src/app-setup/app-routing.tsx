// #region Imports
// React and external libraries
import React from "react";
// #endregion Imports


interface AppRoutes {
    name: React.ReactNode;
    path: string;
}

/**  Routes definitions for breadcrumbs creation */
export const authRoutes = {
    root: { name:'Home', path:'/' } as AppRoutes,
    tablePage: { name:'Table', path:'/table-example' } as AppRoutes,
}