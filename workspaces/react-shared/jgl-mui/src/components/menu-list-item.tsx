// #region Imports

// MUI Components and Icons
 import ListItem from '@mui/material/ListItem';
import { ReactNode } from 'react';
// import { styled } from '@mui/material/styles';

// #endregion Imports


// // Add this interface above the MenuListItem
// export interface StyledMenuListItemProps {
//     isActive?: boolean;
// }

// const MenuListItem2 = styled(ListItem, {
//     shouldForwardProp: (prop) => !['isActive'].includes(prop as string)
// })<StyledMenuListItemProps>(({ theme, isActive }) => ({
//     transition: 'all 0.2s ease-in-out',
//     backgroundColor: isActive ? 
//         theme.palette.primary.main :
//         'inherit',
//     color: isActive ? 
//         theme.palette.primary.contrastText :
//         theme.palette.text.primary,    
//     '&:hover': {
//         backgroundColor: isActive 
//             ? theme.palette.secondary.main 
//             : theme.palette.primary.main,
//         color: theme.palette.secondary.contrastText, // text color on hover
//         '& .MuiListItemIcon-root': {
//             color: theme.palette.secondary.contrastText // icon color on hover
//         }
//     },

//     '& .MuiListItemIcon-root': {
//         color: isActive 
//             ? theme.palette.primary.contrastText
//             : theme.palette.secondary.main // icon color when not active
//     }
// }));

const MenuListItem = ({children} : React.PropsWithChildren) => {
    //return <label>test - {node}</label>
    return <ListItem>test - {children}</ListItem>
}


export default MenuListItem;