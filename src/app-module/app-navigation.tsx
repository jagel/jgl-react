// #region Imports
// React and external libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components and Icons
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    IconButton,
    useTheme
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiChartBar, mdiChevronLeft, mdiChevronRight, mdiHome } from '@mdi/js';


// Styles
import './app-navigation.css';
// #endregion Imports

// #region Interfaces
interface AppNavigationProps {
    open: boolean;
    onClose: () => void;
}
// #endregion Interfaces

export const AppNavigation: React.FC<AppNavigationProps> = ({ open, onClose }) => {
    // #region Initializations
    const theme = useTheme();
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Home', icon: <Icon path={mdiHome} size={1} />, path: '/' },
        { text: 'Table Example', icon: <Icon path={mdiChartBar} size={1} /> , path: '/table-example' }
    ];
    // #endregion Initializations

    // #region Events
    const handleNavigate = (path: string): void => {
        navigate(path);
        onClose();
    };
    // #endregion Events

    // #region Render
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            className="app-navigation"
        >
            <div className="drawer-header">
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? 
                        <Icon path={mdiChevronLeft} size={1.2} /> : 
                        <Icon path={mdiChevronRight} size={1.2} />}
                </IconButton>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem 
                        component="div"
                        key={index}
                        onClick={() => handleNavigate(item.path)}
                        className="navigation-item"
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
    // #endregion Render
};

export default AppNavigation;