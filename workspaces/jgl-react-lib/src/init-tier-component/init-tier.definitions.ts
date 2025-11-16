import React from "react";

export enum EContextTierStatus {
    queued,
    init,
    loading,
    completed,
    failed
}

export enum EContextService {
    appVersioningService,
    i18nService,
    sessionService,
}

export interface ContextTier{
    service: EContextService;
    status: EContextTierStatus;
}

export interface ContextTierMessage {
    globalStatus: EContextTierStatus;
    contextsStatus: Array<ContextTier>;
}

export interface LoadingComponentProps{
    contextTier: ContextTierMessage;
    percentageCompleted: number;
}

export interface InitTierContextProps{
    children: React.ReactNode;
    loadingComponent: React.FC<LoadingComponentProps>;
    errorComponent: React.FC<LoadingComponentProps>;
    onTierChange: ContextTierMessage;
}

export const TIER_MSG = {
    service:(eService: EContextService) : string => {switch(eService){
        case EContextService.appVersioningService: return 'App Versioning Service';
        case EContextService.i18nService: return 'Internationalization Service';
        case EContextService.sessionService: return 'User Session Service';
        default: return 'Unknown Service';
    }},
    status:(eStatus: EContextTierStatus) : string => {switch(eStatus){
        case EContextTierStatus.queued: return 'Queued';
        case EContextTierStatus.init: return 'Initializing';
        case EContextTierStatus.loading: return 'Loading';
        case EContextTierStatus.completed: return 'Completed';
        case EContextTierStatus.failed: return 'Failed';
        default: return 'Unknown Status';
    }}
    }