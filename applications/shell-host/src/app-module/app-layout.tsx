// #region Imports
// React and external libraries
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// MUI
import Button from "@mui/material/Button";
import Icon from "@mdi/react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { mdiMenuClose, mdiMenuOpen } from "@mdi/js";

// Internal modules and components
import AppNavigation from "./app-navigation";
// #endregion Imports


const AppLayout: React.FC = () => {
    // #region Initializations
    const [drawerOpen, setDrawerOpen] = useState(false);
    // #endregion Initializations
    const sxPaddingAdjustment = {
        paddingLeft: drawerOpen ? '250px' : '10px',
        paddingRight: '10px',
        transition: 'padding-left 0.2s'
    };
    return <>
    <Box>
        <AppBar position="sticky" sx={sxPaddingAdjustment}>
            <Toolbar>
                <Button color="inherit" onClick={() => setDrawerOpen(prev => !prev)}>
                    <Icon path={drawerOpen ? mdiMenuOpen : mdiMenuClose} size={1} />
                </Button>
            </Toolbar>
        </AppBar>
        <Box sx={{paddingTop: '16px'}}>
            <AppNavigation open={drawerOpen} onClose={() => setDrawerOpen(false)} />
                
            <Box sx={sxPaddingAdjustment}>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </React.Suspense>
            </Box>
        </Box>
    </Box>
    </>
}

export default AppLayout;
