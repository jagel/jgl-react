import React from "react";

export enum EContextTierStatus {
    queued,
    init,
    loading,
    completed,
    failed
}

export enum EContextService {
    i18nService,
    appVersioningService,
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