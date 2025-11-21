// #region Imports
// React
import React from 'react';

// MUI
import Icon from '@mdi/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { mdiAlertCircle, mdiRefresh, mdiHome } from '@mdi/js';

// #endregion Imports

export interface ErrorPageProps {
    /** Error title */
    title?: string;
    /** Error message */
    message?: string;
    /** Additional error details */
    details?: string;
    /** Custom height for the container */
    minHeight?: string | number;
    /** Callback for retry action */
    onRetry?: () => void;
    /** Callback for home navigation */
    onGoHome?: () => void;
    /** Whether to show action buttons */
    showActions?: boolean;
    /** Custom retry button text */
    retryText?: string;
    /** Custom home button text */
    homeText?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
    title = 'Initialization Error',
    message = 'Something went wrong during the initialization process.',
    details = 'Please try refreshing the page or contact support if the problem persists.',
    minHeight = '100vh',
    onRetry,
    onGoHome,
    showActions = true,
    retryText = 'Try Again',
    homeText = 'Go to Home'
}) => {
    const theme = useTheme();
    
    return (
        <Paper
            elevation={0}
            sx={{
                minHeight,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default,
                padding: 3
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    maxWidth: 500,
                    width: '100%'
                }}
            >
                <Stack spacing={4} alignItems="center">
                    {/* Error Icon */}
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            border: `2px solid ${alpha(theme.palette.error.main, 0.2)}`
                        }}
                    >
                        <Icon
                            path={mdiAlertCircle}
                            size={3}
                            color={theme.palette.error.main}
                        />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h4"
                        component="h1"
                        color="error"
                        fontWeight="bold"
                        gutterBottom
                    >
                        {title}
                    </Typography>

                    {/* Main error message */}
                    <Typography
                        variant="h6"
                        component="p"
                        color="text.primary"
                        sx={{ lineHeight: 1.6 }}
                    >
                        {message}
                    </Typography>

                    {/* Divider */}
                    <Divider sx={{ width: '80%' }} />

                    {/* Error details */}
                    <Box
                        sx={{
                            backgroundColor: alpha(theme.palette.error.main, 0.05),
                            borderRadius: 2,
                            padding: 3,
                            width: '100%',
                            border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ 
                                fontSize: '0.75rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: 1,
                                fontWeight: 'medium'
                            }}
                        >
                            Error Details
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.9rem',
                                lineHeight: 1.5,
                                wordBreak: 'break-word'
                            }}
                        >
                            {details}
                        </Typography>
                    </Box>

                    {/* Action buttons */}
                    {showActions && (
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={2}
                            sx={{ width: '100%', justifyContent: 'center' }}
                        >
                            {onRetry && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onRetry}
                                    startIcon={<Icon path={mdiRefresh} size={0.8} />}
                                    sx={{
                                        minWidth: 140,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 'medium'
                                    }}
                                >
                                    {retryText}
                                </Button>
                            )}
                            {onGoHome && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={onGoHome}
                                    startIcon={<Icon path={mdiHome} size={0.8} />}
                                    sx={{
                                        minWidth: 140,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 'medium'
                                    }}
                                >
                                    {homeText}
                                </Button>
                            )}
                        </Stack>
                    )}

                    {/* Help text */}
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            fontSize: '0.8rem',
                            opacity: 0.7,
                            fontStyle: 'italic'
                        }}
                    >
                        If this error continues to occur, please contact technical support
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default ErrorPage;