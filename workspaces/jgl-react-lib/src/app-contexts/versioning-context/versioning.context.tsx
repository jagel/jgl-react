// #region Imports
// React
import React, { createContext, useEffect, useState } from "react";
import { Observable } from "rxjs";

// Library
import { AppInfo, AppVersioningContextData } from "./versioning.definitions";
import { JglConstants } from "../../definitions/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ContextTier, ContextTierMessage, EContextService, EContextTierStatus } from "../../init-tier-component";
//#endregion Imports

// #region Component props
export interface AppVersioningContextProps {
    expiresInMinutes?: number;
    contextTiers: ContextTierMessage;
    setData: () => Observable<AppInfo>;
    onTierChange: (tier : ContextTier) => void;
    children: React.ReactNode;
}
// #endregion Component props

/**
 * Versioning context, retreive application information from the back end related to versioning
 * @param props 
 * @see {@link AppVersioningContextProps  | the @internal tag}
 * @returns Context
 */
export const AppVersioningContext: React.FC<AppVersioningContextProps> = ({
    expiresInMinutes = 60,
    contextTiers,
    setData,
    onTierChange,
    children }) => {

    // #region Definitions
    const { setOrUpdateLocalStorage, tryGetLocalStorage } = useLocalStorage();
    const [appInfo, setAppInfoData] = useState<AppInfo>({} as AppInfo);
    // #endregion Definitions

    // #region React hooks
    useEffect(() => {
        const versioningService = contextTiers.contextsStatus.find(fi => fi.service === EContextService.appVersioningService);
        if (versioningService?.status === EContextTierStatus.init) {
            //onTierChange({ service: EContextService.appVersioningService, status: EContextTierStatus.loading });

            const appData = tryGetLocalStorage<AppInfo>(JglConstants.localStorage.appVersion);

            if (appData == null) {
                setData().subscribe({
                    next: (versioningData) => {
                        // Set version data in Versioning context
                        setAppInfo(versioningData);

                        // Store in local storage
                        setOrUpdateLocalStorage<AppInfo>(
                            JglConstants.localStorage.appVersion,
                            versioningData,
                            expiresInMinutes)
                        // Update tier status
                        onTierChange({
                            service: EContextService.appVersioningService,
                            status: EContextTierStatus.completed
                        });
                    },
                    error: () => {
                        onTierChange({ service: EContextService.appVersioningService, status: EContextTierStatus.failed });
                    }
                })
            } else {
                setAppInfoData(prev => ({
                    ...prev,
                    appInfo: appData
                }));
                onTierChange({ service: EContextService.appVersioningService, status: EContextTierStatus.completed });
            }
        }
    }, [contextTiers]);
    // #endregion React hooks

    // #region Methods
    const getAppInfo = () : AppInfo => appInfo;
    const setAppInfo = (appInfoData : AppInfo) => setAppInfoData(appInfoData);
    // #endregion Methods

    // #region Render
    return <JglAppVersioningContext.Provider value={{
        getAppInfo,
        setAppInfo,
        getUrlByCode : (code:string) : string | null => appInfo.apiUrl?.find(api => api.code === code)?.url || null,
        getSecurityUrl : () : string => appInfo.securityUrl
    }}>
        {children}
    </JglAppVersioningContext.Provider>
    // #endregion Render
}

export const JglAppVersioningContext = createContext<AppVersioningContextData>({
    getAppInfo : () => ({}) as AppInfo,
    setAppInfo : () => {},
    getUrlByCode : () => 'undefined',
    getSecurityUrl : () => 'undefined'
});
