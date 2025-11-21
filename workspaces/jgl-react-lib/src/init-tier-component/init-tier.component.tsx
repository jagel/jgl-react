// #region Imports

// JGL Library
import React from "react";
import { EContextTierStatus, LoadingComponentProps } from "./init-tier.definitions";
import useInitTier, { UseInitTierProps } from "./useInitTier";
// #endregion Imports

// #region Definitions
export interface InitTierContextProps{
    contextTiers: UseInitTierProps[];
    loadingComponent: React.FC<LoadingComponentProps>;
    errorComponent: React.FC<LoadingComponentProps>;    
    children: React.ReactNode;
}

// #endregion Definitions

/**
 * InitContextTier component to manage initialization tiers.
 * @param props - The properties for configuring initialization tiers, loading and error components, debug mode, and children to render.
 * @returns A React element that renders the appropriate loading, error, or child content based on initialization status.
 */
const InitContextTier : React.FC<InitTierContextProps> = ({
    contextTiers,
    loadingComponent,
    errorComponent,
    children
}) => {

    const [initTier, appInfo] = useInitTier(contextTiers);
    
    switch(initTier.globalStatus){
        // Loading  cases
        case EContextTierStatus.queued:
        case EContextTierStatus.init:
        case EContextTierStatus.loading:
            const loadingContent = loadingComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return loadingContent;
        
        // Completed case
        case EContextTierStatus.completed:
            return children;

        // Failed case
        case EContextTierStatus.failed:
            const errorContent = errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return errorContent;

        // Unknown case
        default:
            const defaultErrorContent = errorComponent({contextTier: initTier, tierInfo: appInfo}) as React.ReactNode;
            return defaultErrorContent;
    }
}

export default InitContextTier;