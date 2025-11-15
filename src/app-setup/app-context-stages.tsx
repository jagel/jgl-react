// #region Imports

// React
import React from 'react';

// MUI
import Paper from '@mui/material/Paper';

// JGL libraries
import { EContextService, InitContextTier, LoadingComponentProps, useInitTier } from '@jgl-react-lib/init-tier-component';
import { AppVersioningContext, iAppVersioningContextData } from '@jgl-react-lib/app-contexts/versioning-context';
import { Appi18nContext, I18nCatalog } from '@jgl-react-lib/app-contexts/i18n-context';

import { Observable } from 'rxjs';
import { UserSessionContext } from '@jgl-react-lib/app-contexts';
import { AppData } from '@jgl-react-lib/models';

// #endregion Imports

/*
// Option 1: Using ReactNode (most common and flexible)
export const ContextStages = (props: { children: ReactNode }) => {
    return <label>demo label</label>
}

// Option 2: Using React.PropsWithChildren utility type
export const ContextStages = (props: React.PropsWithChildren) => {
    return <label>demo label</label>
}

// Option 3: If you need additional props with children
export const ContextStages = (props: React.PropsWithChildren<{ someOtherProp?: string }>) => {
    return <label>demo label</label>
}
*/

export const AppContextStages = ({children} : React.PropsWithChildren) => {

    //#region Initializations
	const [initTier, updateInitTier] = useInitTier([
        EContextService.appVersioningService,
        EContextService.i18nService,
        EContextService.sessionService
    ]);
    //#endregion Initializations

    // #region Methods
    const mockInitVersionContext = () : Observable<iAppVersioningContextData> => 
        new Observable<iAppVersioningContextData>(subscriber => {
            setTimeout(() => {
                subscriber.next({
                    appInfo: { appName: 'Demo React App', appVersion: 'X.Y.Z', guardianHealthCheck: true, gatewayHealthCheck: true }                    
                });
                // subscriber.error('Mock initialization failed');
                subscriber.complete();
            }, 1000)
        });

     const mockInitI18nCatalogContext = () : Observable<Array<I18nCatalog>> => 
        new Observable<Array<I18nCatalog>>(subscriber => {
            setTimeout(() => {
                subscriber.next([
                    {language: 'en', key: 'greeting', value: 'Hello'}, {language: 'es', key: 'greeting', value: 'Hola'},
                    {language: 'en', key: 'create', value: 'Create'}, {language: 'es', key: 'create', value: 'Crear'}
                ]);
                subscriber.complete();
            }, 3000)
        });

     const mockGetUser = () : Observable<AppData> => 
        new Observable<AppData>(subscriber => {
            setTimeout(() => {
                subscriber.next({
                    userSession: {
                        accessToken: '',
                        idToken: '',
                        expiredDate: new Date(Date.now()),
                        refreshToken: '',
                        sub: '',
                        roles: ['Admin', 'User','Guest'],
                        scopes: ['read', 'write'],
                    },
                    userProfile: {
                        name: '',
                        email: '',
                        accessClaims: ['claim1', 'claim2']
                    },
                    language: 'en',
                    gatewayUri: 'https://api.demo.com',
                });
                subscriber.complete();
            }, 2000)
        });
    // #endregion Methods
    
    // #region Render
    const loadingComponent: React.FC<LoadingComponentProps> = ({ percentageCompleted }) => (
        <Paper style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>Loading... {percentageCompleted.toFixed(0)}%</div>
        </Paper>
    );
    const errorComponent: React.FC<LoadingComponentProps> = () => (
        <Paper style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Error during initialization. Please try again later. </p>
        </Paper>
    );

    
    return (
    <AppVersioningContext setData={() => mockInitVersionContext()} contextTiers={initTier} onTierChange={updateInitTier}>
        <Appi18nContext initCatalog={() => mockInitI18nCatalogContext()} contextTiers={initTier} onTierChange={updateInitTier}>
            <UserSessionContext getUser={mockGetUser} contextTiers={initTier} onTierChange={updateInitTier}>
                <InitContextTier loadingComponent={loadingComponent} errorComponent={errorComponent} onTierChange={initTier}>
                    {children}
                </InitContextTier>
            </UserSessionContext>
        </Appi18nContext>
    </AppVersioningContext>
    );
    // #endregion Render
}

