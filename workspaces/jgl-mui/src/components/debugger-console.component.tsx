// #region Imports
import React, { useState } from "react";
import {
    Box,
    Collapse,
    Paper,
    Typography,
    IconButton,
    Chip,
    useTheme,
} from "@mui/material";
import Icon from "@mdi/react";
import { 
    mdiChevronDown, 
    mdiChevronUp, 
    mdiBug 
} from "@mdi/js";
// #endregion Imports

// #region Definitions
export interface DebuggerConsoleProps {
    debugData: any;
    children: React.ReactNode;
    section:string;
}
// #endregion Definitions

/**
 * DebuggerConsole component with collapsible/expandable functionality
 * Displays debug information in an overlay without pushing down content
 * @param props 
 * @returns 
 */
const DebuggerConsole: React.FC<DebuggerConsoleProps> = ({
    debugData,
    children,
    section
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (<Box sx={{  width: '100%', height: '100%' }}>
        <Box >
            {/* Debug Console Bar - Always visible at top */}
            <Paper
                elevation={3}
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: 48,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.800',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    zIndex: 9999,
                    borderRadius: 0,
                    transition: 'all 0.3s ease-in-out',
                    borderBottom: `2px solid ${
                        isExpanded 
                            ? theme.palette.mode === 'dark' ? 'grey.600' : 'grey.500'
                            : theme.palette.mode === 'dark' ? 'grey.700' : 'grey.600'
                    }`,
                }}
            >
                <IconButton
                    onClick={toggleExpanded}
                    aria-label={isExpanded ? 'Collapse debug console' : 'Expand debug console'}
                    sx={{ 
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    <Icon 
                        path={isExpanded ? mdiChevronUp : mdiChevronDown} 
                        size={1} 
                    />
                </IconButton>
              
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, ml: 2 }}>
                    <Icon 
                        path={mdiBug} 
                        size={0.8} 
                        style={{ color: '#ef5350' }}
                    />
                    <Chip
                        label="Debug Mode"
                        size="small"
                        sx={{
                            bgcolor: 'error.main',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    />
                    <Chip
                        label={section}
                        size="small"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    />
                </Box>
            </Paper>

            {/* Debug Content - Only visible when expanded */}
            <Collapse in={isExpanded}>
                <Paper
                    elevation={2}
                    sx={{
                        position: 'fixed',
                        top: 48,
                        left: 0,
                        right: 0,
                        maxHeight: '60vh',
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                        borderBottom: `2px solid ${theme.palette.divider}`,
                        zIndex: 9998,
                        overflow: 'auto',
                        borderRadius: 0,
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'common.white',
                                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                                fontSize: '0.75rem',
                                lineHeight: 1.5,
                                overflow: 'auto',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                                '& pre': {
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                }
                            }}
                        >
                            <Typography
                                component="pre"
                                sx={{ 
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    color: theme.palette.mode === 'dark' ? 'grey.100' : 'grey.800',
                                    m: 0
                                }}
                            >
                                {JSON.stringify(debugData, null, 2)}
                            </Typography>
                        </Paper>
                    </Box>
                </Paper>
            </Collapse>

        </Box>
        <Box>
            {children}
        </Box>
    </Box>);
};

export default DebuggerConsole;