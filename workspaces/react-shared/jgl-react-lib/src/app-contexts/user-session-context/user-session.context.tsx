// #region Imports
// React
import React, { createContext, ReactNode, useEffect, useState } from "react";

// Library
import { UserSessionContextModel, UserPreferences,UserProfile, UserSessionModel, AccessData } from "./user-session.model";
import { AccessValidationType } from "./user-session.definitions";
//#endregion Imports

export interface UserSessionContextProps {
    userSession: UserSessionModel;
    children: ReactNode;
}

export const UserSessionContext: React.FC<UserSessionContextProps> = ({
    userSession,
    children
}) => {
    // #region Definitions
    const [userSessionData, setUserSessionData] = useState<UserSessionModel>(userSession);
    // #endregion Definitions
    
    // #region react hooks
    useEffect(() => {
        setUserSessionData(userSession);
    }, [userSession]);
    // #endregion react hooks

    // #region methods
    const getUserProfile = (): UserProfile => userSessionData.isLoggedIn ? userSessionData.userProfile as UserProfile : {} as UserProfile;
    const getAccessData = (): AccessData => userSessionData.isLoggedIn ? userSessionData.accessData as AccessData : {} as AccessData;
    const getUserPreferences = (): UserPreferences => userSessionData.isLoggedIn ? userSessionData.userPreferences as UserPreferences : {} as UserPreferences;
    const isUserInRoles = (roles: Array<string>,validation: AccessValidationType ) => {
        switch(validation){
            case 'any':
                return roles.some(r => userSessionData.accessData?.roles.includes(r));
            case 'all':
                return roles.every(r => userSessionData.accessData?.roles.includes(r));
            default:
                return false;
        }
    };
        const hasUserAccess = (accessCodes: Array<string>,validation: AccessValidationType ) => {
        switch(validation){
            case 'any':
                return accessCodes.some(ra => userSessionData.accessData?.roleAccess.includes(ra));
            case 'all':
                return accessCodes.every(ra => userSessionData.accessData?.roleAccess.includes(ra));
            default:
                return false;
        }
    };
    // #endregion methods

    // #region render
    return <JglUserSessionContext.Provider value={{
        getUserProfile : getUserProfile,
        getAccessData : getAccessData,
        getUserPreferences : getUserPreferences,
        isUserInRoles : isUserInRoles,
        hasUserAccess : hasUserAccess,
        isUserLoggedIn : () => userSessionData.isLoggedIn
    }}>
        {children}
    </JglUserSessionContext.Provider>
    // #endregion render
}

export const JglUserSessionContext = createContext<UserSessionContextModel>({
    getUserProfile : () => ({} as UserProfile),
    getAccessData : () => ({} as AccessData),
    getUserPreferences : () => ({} as UserPreferences),
    isUserInRoles : () => false,
    hasUserAccess : () => false,
    isUserLoggedIn : () => false
});