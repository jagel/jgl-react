// #region Imports
// React
import React, { createContext, useEffect, useState } from "react";

// Library
import { AppInfo, AppVersioningContextData } from "./app-info.definitions";
//#endregion Imports

// #region Component props
export interface AppInfoContextProps {
    appInfo: AppInfo;
    children: React.ReactNode;
}
// #endregion Component props

/**
 * Application information context, retreive application information from the back end related to versioning
 * @param props 
 * @see {@link AppInfoContextProps  | the @internal tag}
 * @returns Context
 */
export const AppInfoContext: React.FC<AppInfoContextProps> = ({
    appInfo,
    children }) => {

    // #region Definitions
    const [appInfoData, setAppInfoData] = useState<AppInfo>(appInfo);
    // #endregion Definitions

    // #region React hooks
    useEffect(() => {
        setAppInfoData(appInfo);
    }, [appInfo]);
    // #endregion React hooks

    // #region Methods
    const getAppInfo = () : AppInfo => appInfoData;
    const setAppInfo = (appInfoData : AppInfo) => setAppInfoData(appInfoData);
    // #endregion Methods

    // #region Render
    return <JglAppInfoContext.Provider value={{
        getAppInfo,
        setAppInfo,
        getUrlByCode : (code:string) : string | null => appInfoData.apiUrl?.find(api => api.code === code)?.url || null,
        getSecurityUrl : () : string => appInfoData.securityUrl
    }}>
        {children}
    </JglAppInfoContext.Provider>
    // #endregion Render
}

export const JglAppInfoContext = createContext<AppVersioningContextData>({
    getAppInfo : () => ({}) as AppInfo,
    setAppInfo : () => {},
    getUrlByCode : () => 'undefined',
    getSecurityUrl : () => 'undefined'
});
