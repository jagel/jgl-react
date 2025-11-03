// #region Imports

// MUI Components and Icons
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

// #endregion Imports


// Add this interface above the MenuListItem
interface StyledMenuListItemProps {
    isActive?: boolean;
}

const MenuListItem = styled(ListItem, {
    shouldForwardProp: (prop) => !['isActive'].includes(prop as string)
})<StyledMenuListItemProps>(({ theme, isActive }) => ({
    transition: 'all 0.2s ease-in-out',
    backgroundColor: isActive ? 
        theme.palette.primary.main :
        'inherit',
    color: isActive ? 
        theme.palette.primary.contrastText :
        theme.palette.text.primary,    
    '&:hover': {
        backgroundColor: isActive 
            ? theme.palette.secondary.main 
            : theme.palette.primary.main,
        color: theme.palette.secondary.contrastText, // text color on hover
        '& .MuiListItemIcon-root': {
            color: theme.palette.secondary.contrastText // icon color on hover
        }
    },

    '& .MuiListItemIcon-root': {
        color: isActive 
            ? theme.palette.primary.contrastText
            : theme.palette.secondary.main // icon color when not active
    }
}));

export default MenuListItem;