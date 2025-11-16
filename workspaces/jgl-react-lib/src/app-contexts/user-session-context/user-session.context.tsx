// #region Imports
// React
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Observable } from "rxjs";

// Library
import { UserSessionContextModel, UserPreferences,UserProfile, UserSessionModel, AccessData } from "./user-session.model";
import { ContextTier, ContextTierMessage, EContextService, EContextTierStatus } from "../../init-tier-component/init-tier.definitions";
import { AccessValidationType } from "./user-session.definitions";
//#endregion Imports

export interface UserSessionContextProps {
    children: ReactNode;
    getUser: () => Observable<UserSessionModel>;
    contextTiers: ContextTierMessage;
    onTierChange: (tier: ContextTier) => void
}


export const UserSessionContext: React.FC<UserSessionContextProps> = ({
    children,
    getUser,
    contextTiers,
    onTierChange
}) => {
    // #region Definitions
    const [userSession, setUserSession] = useState<UserSessionModel>({} as UserSessionModel);
    // #endregion Definitions
    
    // #region react hooks
    useEffect(() => {
        const sessionService = contextTiers.contextsStatus.find(fi => fi.service === EContextService.sessionService);
        if (sessionService?.status === EContextTierStatus.init && contextTiers.globalStatus !== EContextTierStatus.failed) {
            
            onTierChange({
                service: EContextService.sessionService,
                status: EContextTierStatus.loading 
            });
            
            getUser().subscribe({
                next: (response: UserSessionModel) => {
                    // Set user session data
                    setUserSession(response);
                    // Update tier status
                    onTierChange({
                        service: EContextService.sessionService,
                        status: EContextTierStatus.completed
                    });
                }, error: () => {
                    onTierChange({
                        service: EContextService.sessionService,
                        status: EContextTierStatus.failed
                    });
                },
            });
        }
    }, [contextTiers]);
    // #endregion react hooks

    // #region methods
    const getUserProfile = (): UserProfile => userSession.isLoggedIn ? userSession.userProfile as UserProfile : {} as UserProfile;
    const getAccessData = (): AccessData => userSession.isLoggedIn ? userSession.accessData as AccessData : {} as AccessData;
    const getUserPreferences = (): UserPreferences => userSession.isLoggedIn ? userSession.userPreferences as UserPreferences : {} as UserPreferences;
    const isUserInRoles = (roles: Array<string>,validation: AccessValidationType ) => {
        switch(validation){
            case 'any':
                return roles.some(r => userSession.accessData?.roles.includes(r));
            case 'all':
                return roles.every(r => userSession.accessData?.roles.includes(r));
            default:
                return false;
        }
    };
        const hasUserAccess = (accessCodes: Array<string>,validation: AccessValidationType ) => {
        switch(validation){
            case 'any':
                return accessCodes.some(ra => userSession.accessData?.roleAccess.includes(ra));
            case 'all':
                return accessCodes.every(ra => userSession.accessData?.roleAccess.includes(ra));
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
        isUserLoggedIn : () => userSession.isLoggedIn
    }}>
        {children}
    </JglUserSessionContext.Provider>
    // #endregion render
}

const JglUserSessionContext = createContext<UserSessionContextModel>({
    getUserProfile : () => ({} as UserProfile),
    getAccessData : () => ({} as AccessData),
    getUserPreferences : () => ({} as UserPreferences),
    isUserInRoles : () => false,
    hasUserAccess : () => false,
    isUserLoggedIn : () => false
});