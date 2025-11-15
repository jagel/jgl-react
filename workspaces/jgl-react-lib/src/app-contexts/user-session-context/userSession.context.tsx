// #region Imports
// React
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Observable } from "rxjs";

// Library
import { AppData } from "../../models/initialize.model";
import { UserSessionModel } from "./userSession.model";
import { ContextTier, ContextTierMessage, EContextService, EContextTierStatus } from "../../init-tier-component/init-tier.definitions";
//#endregion Imports

export interface UserSessionContextProps {
    children: ReactNode;
    getUser: () => Observable<AppData>;
    contextTiers: ContextTierMessage;
    onTierChange: (tier: ContextTier) => void
}

export const UserSessionContext: React.FC<UserSessionContextProps> = ({
    children,
    getUser,
    contextTiers,
    onTierChange
}) => {
    const [userSession, setUserSession] = useState<UserSessionModel>(new UserSessionModel());

    useEffect(() => {
        const sessionService = contextTiers.contextsStatus.find(fi => fi.service === EContextService.sessionService);
        if (sessionService?.status === EContextTierStatus.init) {
            onTierChange({ service: EContextService.sessionService, status: EContextTierStatus.loading });
            getUser().subscribe({
                next: (response: AppData) => {
                    // Set user session data
                    setUserSession(response.userProfile ? new UserSessionModel(response) : new UserSessionModel());
                    // Update tier status
                    onTierChange({ service: EContextService.sessionService, status: EContextTierStatus.completed });
                }, error: () => {
                    onTierChange({ service: EContextService.sessionService, status: EContextTierStatus.failed });
                },
            });
        }
    }, [contextTiers]);

    return <JglUserSessionContext.Provider value={userSession}>
        {children}
    </JglUserSessionContext.Provider>
}

export const JglUserSessionContext = createContext<UserSessionModel>(new UserSessionModel());
