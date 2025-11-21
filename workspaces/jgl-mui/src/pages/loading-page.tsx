import React from 'react';
import {
    Box,
    Paper,
    CircularProgress,
    LinearProgress,
    Typography,
    Stack,
    useTheme,
    alpha
} from '@mui/material';

export interface LoadingPageProps {
    /** Progress percentage (0-100) */
    percentageCompleted: number;
    /** Current operation being processed */
    currentOperation?: string;
    /** Custom title for the loading page */
    title?: string;
    /** Whether to show the percentage text */
    showPercentage?: boolean;
    /** Custom height for the container */
    minHeight?: string | number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    percentageCompleted,
    currentOperation = 'Initializing...',
    title = 'Loading',
    showPercentage = true,
    minHeight = '100vh'
}) => {
    const theme = useTheme();
    
    // Ensure percentage is between 0 and 100
    const normalizedPercentage = Math.min(100, Math.max(0, percentageCompleted));
    
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
                    maxWidth: 400,
                    width: '100%'
                }}
            >
                <Stack spacing={4} alignItems="center">
                    {/* Main spinner */}
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant="determinate"
                            value={normalizedPercentage}
                            size={80}
                            thickness={4}
                            sx={{
                                color: theme.palette.primary.main,
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {showPercentage && (
                                <Typography
                                    variant="h6"
                                    component="div"
                                    color="primary"
                                    fontWeight="bold"
                                >
                                    {`${Math.round(normalizedPercentage)}%`}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h5"
                        component="h1"
                        color="primary"
                        fontWeight="medium"
                    >
                        {title}
                    </Typography>

                    {/* Progress bar */}
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress
                            variant="determinate"
                            value={normalizedPercentage}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    backgroundColor: theme.palette.primary.main,
                                }
                            }}
                        />
                    </Box>

                    {/* Current operation */}
                    <Box
                        sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 2,
                            padding: 2,
                            width: '100%',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            Current Operation
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.primary"
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                wordBreak: 'break-word'
                            }}
                        >
                            {currentOperation}
                        </Typography>
                    </Box>

                    {/* Animated dots */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            '&::after': {
                                content: '"..."',
                                animation: 'dots 1.5s steps(5, end) infinite',
                            },
                            '@keyframes dots': {
                                '0%, 20%': {
                                    color: 'rgba(0,0,0,0)',
                                    textShadow: '.25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0)'
                                },
                                '40%': {
                                    color: theme.palette.text.secondary,
                                    textShadow: '.25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0)'
                                },
                                '60%': {
                                    textShadow: `.25em 0 0 ${theme.palette.text.secondary}, .5em 0 0 rgba(0,0,0,0)`
                                },
                                '80%, 100%': {
                                    textShadow: `.25em 0 0 ${theme.palette.text.secondary}, .5em 0 0 ${theme.palette.text.secondary}`
                                }
                            }
                        }}
                    >
                        Please wait while we prepare everything for you
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default LoadingPage;