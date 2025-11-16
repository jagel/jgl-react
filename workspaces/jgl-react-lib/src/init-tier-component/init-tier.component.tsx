// #region Imports

// JGL Library
import React from "react";
import { EContextTierStatus, LoadingComponentProps, TIER_MSG } from "./init-tier.definitions";
import { useInitTier, UseInitTierProps } from "./useInitTier";
import DebuggerConsole from "../helper-pages/debugger-console.component";
// #endregion Imports

// #region Definitions
export interface InitTierContextProps{
    contextTiers: UseInitTierProps[];
    loadingComponent: React.FC<LoadingComponentProps>;
    errorComponent: React.FC<LoadingComponentProps>;    
    enableDebug?: boolean;
    children: React.ReactNode;
}

// #endregion Definitions

/**
 * InitContextTier component to manage initialization tiers
 * @param props 
 * @returns 
 */
const InitContextTier : React.FC<InitTierContextProps> = ({
    contextTiers,
    loadingComponent,
    errorComponent,
    enableDebug = false,
    children
}) => {

    const [initTier, appInfo] = useInitTier(contextTiers);
    
    // Prepare debug data for the DebuggerConsole
    const debugData = {
        globalStatus: TIER_MSG.status(initTier.globalStatus),
        contextStatus: initTier.contextsStatus.map(ctier => ({ 
            service: TIER_MSG.service(ctier.service), 
            status: TIER_MSG.status(ctier.status) 
        })),
    };

    switch(initTier.globalStatus){
        case EContextTierStatus.queued:
        case EContextTierStatus.init:
        case EContextTierStatus.loading:
            const loadingContent = loadingComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return enableDebug ? (
                <DebuggerConsole debugData={debugData} section="InitContextTier loading">
                    {loadingContent}
                </DebuggerConsole>
            ) : loadingContent;
        case EContextTierStatus.completed:
            return children;
        case EContextTierStatus.failed:
            const errorContent = errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return enableDebug ? (
                <DebuggerConsole debugData={debugData} section="InitContextTier failed">
                    {errorContent}
                </DebuggerConsole>
            ) : errorContent;
        default:
            const defaultErrorContent = errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return enableDebug ? (
                <DebuggerConsole debugData={debugData} section="InitContextTier undefined">
                    {defaultErrorContent}
                </DebuggerConsole>
            ) : defaultErrorContent;
    }
}

export default InitContextTier;