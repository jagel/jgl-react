// #region Imports

// JGL Library
import React from "react";
import { EContextTierStatus, LoadingComponentProps, TIER_MSG } from "./init-tier.definitions";
import { useInitTier, UseInitTierProps } from "./useInitTier";
// #endregion Imports

// #region Definitions
export interface InitTierContextProps{
    contextTiers: UseInitTierProps[];
    loadingComponent: React.FC<LoadingComponentProps>;
    errorComponent: React.FC<LoadingComponentProps>;    
    children: React.ReactNode;
    enableDebug?: boolean;
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
    const DebuggerConsole = (children: React.ReactNode) : React.ReactNode => {
        return <>
            <code>
                <pre>{JSON.stringify({
                    globalStatus : TIER_MSG.status(initTier.globalStatus),
                    contextStatus : initTier.contextsStatus.map(ctier => ({ service: TIER_MSG.service(ctier.service), status: TIER_MSG.status(ctier.status) })),
                    }, null, 2)}</pre>
            </code>
            <hr />
            {children}
        </>
    };
    
    switch(initTier.globalStatus){
        case EContextTierStatus.queued:
        case EContextTierStatus.init:
        case EContextTierStatus.loading:
            return enableDebug ? DebuggerConsole(loadingComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode)  : loadingComponent({contextTier: initTier, tierInfo: appInfo}) ;
        case EContextTierStatus.completed:
            return children;
        case EContextTierStatus.failed:
            return enableDebug ? DebuggerConsole(errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode)  : errorComponent({contextTier: initTier, tierInfo: appInfo}) ;
        default:
            return enableDebug ? DebuggerConsole(errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode)  : errorComponent({contextTier: initTier, tierInfo: appInfo}) ;
    }
}

export default InitContextTier;