// #region Imports
// React and external libraries
import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// MUI Components and Icons
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight, mdiLock, mdiLockOpen } from '@mdi/js';

// JGL Library
import MenuListItem from '@jgl-mui/components/menu-list-item';

// Internal imports
import { AppRoutes, authRoutes } from '../app-setup/app-routing';

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
    const location = useLocation();

    const menuItems = useMemo((): AppRoutes[] => (Object.values(authRoutes) ), []);
    const [lockDrawer, setLockDrawer] = useState(false);

    // #endregion Initializations

    // #region Events
    const handleNavigate = (path: string): void => {
        navigate(path);
        if(!lockDrawer){
            onClose();
        }
    };

    const onCloseBtnClick = () => {
        if(!lockDrawer){
            onClose();
        }
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
            <List component={"nav"}>
                {menuItems.map((item, index) => (
                    <MenuListItem
                        key={index}
                        onClick={() => handleNavigate(item.path)}
                        className={'navigation-item-' + index}
                        sx={{ cursor: 'pointer' }}
                        isActive={location.pathname === item.path} // Add this line
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </MenuListItem>
                ))}
            </List>

            <div className="drawer-header">
                 <IconButton color='secondary' onClick={() => setLockDrawer(prev => !prev)}>
                    { <Icon path={lockDrawer ? mdiLock : mdiLockOpen} size={1} /> } 
                </IconButton>

                <IconButton disabled={lockDrawer} color='primary' onClick={(onCloseBtnClick)}>
                    { <Icon path={ theme.direction === 'ltr' ? mdiChevronLeft : mdiChevronRight} size={1} /> }
                </IconButton>
            </div>
        </Drawer>
    );
    // #endregion Render
};

export default AppNavigation;