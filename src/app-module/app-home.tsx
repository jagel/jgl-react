// #region Imports
// React and external libraries
import { Button } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import React, { useState } from "react";
// #endregion Imports

const AppHome: React.FC = () => {
        const { setMode } = useColorScheme();
const [islight, setislight] = useState(true);

    const toggleMode = () => {
        if (islight) {
            setMode('dark');
        } else {
            setMode('light');
        }
        setislight(!islight);
    }
    
    return <>
    <Button variant="contained" onClick={toggleMode} sx={{ mb: 2 }}>
        {islight ? 'Light Mode ➡️ Dark Mode' : 'Dark Mode ➡️ Light Mode'}
    </Button>
        <h1>Welcome to the Application Home Page</h1>
        <p>This is the main landing page of the application.</p>
    </>
}

export default AppHome;