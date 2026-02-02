// #region Imports
// React and external libraries
import { mdiButtonCursor, mdiChartBar, mdiHome } from "@mdi/js";
import Icon from "@mdi/react";

// Internal references
import { AppRoutes } from "@app/models/app-setup.model";
// #endregion Imports


/**  Routes definitions for breadcrumbs creation */
export const APP_ROUTES : Record<string, AppRoutes> = {
    root: { name:'Home root', path:'', icon: <Icon path={mdiHome} size={1} /> } as AppRoutes,
    tablePage: { name:'Table', path:'table-example', icon: <Icon path={mdiChartBar} size={1} /> } as AppRoutes,
    buttonsShowcase: { name:'Buttons Showcase', path:'buttons-showcase', icon: <Icon path={mdiButtonCursor} size={1} /> } as AppRoutes,
}
