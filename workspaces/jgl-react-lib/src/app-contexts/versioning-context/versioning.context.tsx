// #region Imports
// React
import React, { createContext, useEffect, useState } from "react";

// Library
import { AppVersioningContextProps, iAppVersioningContextData } from "./versioning.definitions";
import { JglConstants } from "../../definitions/constants";
import { AppInfo } from "../../models/app-Info.model";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { EContextService, EContextTierStatus } from "../../init-tier-component";
//#endregion Imports

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

    const { setOrUpdateLocalStorage, tryGetLocalStorage } = useLocalStorage();
    const [versioningData, setVersioningData] = useState<iAppVersioningContextData>({} as iAppVersioningContextData);

    useEffect(() => {
        const versioningService = contextTiers.contextsStatus.find(fi => fi.service === EContextService.appVersioningService);
        if (versioningService?.status === EContextTierStatus.init) {
            //onTierChange({ service: EContextService.appVersioningService, status: EContextTierStatus.loading });

            const appData = tryGetLocalStorage<AppInfo>(JglConstants.localStorage.appVersion);

            if (appData == null) {
                setData().subscribe({
                    next: (versioningData) => {
                        // Set version data in Versioning context
                        setVersioningData(versioningData);

                        // Store in local storage
                        setOrUpdateLocalStorage<AppInfo>(
                            JglConstants.localStorage.appVersion,
                            versioningData.appInfo,
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
                setVersioningData(prev => {
                    prev.appInfo = appData;
                    return prev;
                });
                onTierChange({ service: EContextService.appVersioningService, status: EContextTierStatus.completed });
            }
        }
    }, [contextTiers]);


    return <JglAppVersioningContext.Provider value={versioningData}>
        {children}
    </JglAppVersioningContext.Provider>
}

export const JglAppVersioningContext = createContext<iAppVersioningContextData>({
    appInfo: {
        appName: '',
        appVersion: '',
        guardianHealthCheck: false,
        gatewayHealthCheck: false
    }
});
