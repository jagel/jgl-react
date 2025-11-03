// #region Imports
// React and external libraries
import { Button } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import React, { useState } from "react";
// #endregion Imports

const AppHome: React.FC = () => {
    const { mode, setMode } = useColorScheme();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }
    
    return <>
    <Button variant="contained" onClick={toggleMode} sx={{ mb: 2 }}>
        {mode === 'light' ? 'Light Mode ➡️ Dark Mode' : 'Dark Mode ➡️ Light Mode'}
    </Button>
        <h1>Welcome to the Application Home Page</h1>
        <p>This is the main landing page of the application.</p>
    </>
}

export default AppHome;