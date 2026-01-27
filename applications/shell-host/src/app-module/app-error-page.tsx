// #region Imports
// React and external libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components and Icons
import { 
    Box,
    Button,
    Container,
    Typography
} from '@mui/material';
import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';

// #endregion Imports

// #region Interfaces
interface AppNotFoundProps {
    title?: string;
    message?: string;
}
// #endregion Interfaces

export const AppErrorPage: React.FC<AppNotFoundProps> = ({ 
    title = '404: Page Not Found',
    message = 'Sorry, the page you are looking for does not exist.' 
}) => {
    // #region Initializations
    const navigate = useNavigate();
    // #endregion Initializations

    // #region Events
    const handleNavigateHome = (): void => {
        navigate('/');
    };
    // #endregion Events

    // #region Render
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                    gap: 2
                }}
            >
                <Typography variant="h2" component="h1">
                    {title}
                </Typography>
                <Typography variant="h5" component="p" color="text.secondary">
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Icon path={mdiHome} size={1} />}
                    onClick={handleNavigateHome}
                    sx={{ mt: 4 }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
    // #endregion Render
};

export default AppErrorPage;