// #region Imports
// React and external libraries
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// Internal modules and components
import AppNavigation from "./app-navigation";
import Button  from "@mui/material/Button";
import Icon from "@mdi/react";
import { mdiMenuClose, mdiMenuOpen } from "@mdi/js";
// #endregion Imports


const AppLayout: React.FC = () => {
    // #region Initializations
    const [drawerOpen, setDrawerOpen] = useState(false);
    // #endregion Initializations

    return <> 
     <AppNavigation open={drawerOpen} onClose={()=>setDrawerOpen(false)} />
    <div style={{display:'flex', flexDirection:'column', height:'100vh', gap:'10px'}}>
        <nav style={{paddingLeft:drawerOpen? '250px':'10px', transition:'padding-left 0.2s'}}>
            <Button variant="outlined" onClick={() => setDrawerOpen(prev => !prev)}>
                <Icon path={drawerOpen ? mdiMenuOpen : mdiMenuClose} size={1} />
            </Button>
        </nav>
        <div style={{paddingLeft:drawerOpen? '250px':'10px', transition:'padding-left 0.2s'}}>
            {/* This is where nested route components will be rendered */}
            <React.Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </React.Suspense>
        </div>
    </div>
    </>
}

export default AppLayout;
