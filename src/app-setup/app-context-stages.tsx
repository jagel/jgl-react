// #region Imports

// React
import React from 'react';
import { map, Observable, tap } from 'rxjs';

// MUI
import Paper from '@mui/material/Paper';

// JGL libraries
import { EContextService, InitContextTier, LoadingComponentProps, useInitTier } from '@jgl-react-lib/init-tier-component';
import { AppInfo, AppVersioningContext } from '@jgl-react-lib/app-contexts/versioning-context';
import { Appi18nContext, I18nCatalog } from '@jgl-react-lib/app-contexts/i18n-context';

import { UserSessionContext, UserSessionModel } from '@jgl-react-lib/app-contexts';
import { useColorScheme } from '@mui/material';

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
    const {setMode} = useColorScheme();
    //#endregion Initializations

    // #region Methods
    const mockInitVersionContext = () : Observable<AppInfo> => 
        new Observable<AppInfo>(subscriber => {
            setTimeout(() => {
                subscriber.next(
                    {
                        appName: 'Demo React App',
                        appVersion: 'X.Y.Z',
                        defaultLanguage: 'en',
                        securityUrl: 'https://security.demo.com',
                        apiUrl: [{url: 'https://api.demo.com/v1', code: 'v1'},],
                        healthySecurityService: true,
                        healthyApiService: true
                    });
                // subscriber.error('Mock initialization failed');
                subscriber.complete();
            }, 300)
        });

     const mockInitI18nCatalogContext = () : Observable<Array<I18nCatalog>> => 
        new Observable<Array<I18nCatalog>>(subscriber => {
            setTimeout(() => {
                subscriber.next([
                    {language: 'en', key: 'greeting', value: 'Hello'}, {language: 'es', key: 'greeting', value: 'Hola'},
                    {language: 'en', key: 'create', value: 'Create'}, {language: 'es', key: 'create', value: 'Crear'}
                ]);
                subscriber.complete();
            }, 300)
        });

     const mockGetUser = () : Observable<UserSessionModel> => 
        new Observable<UserSessionModel>(subscriber => {
            setTimeout(() => {
                subscriber.next({
                    userProfile: {
                        name: 'test',
                        email: 'mail@test.com',
                        username: 'username_test',
                        intitials: 'TT'
                    },
                    accessData: {
                        accessToken: '<mocked_token>',
                        idToken: '<mocked_id_token>',
                        expiredDate: new Date(Date.now()),
                        refreshToken: '<mocked_refresh_token>',
                        sub: '<mocked_sub>',
                        roles: ['Admin', 'User','Guest'],
                        roleAccess: ['read', 'write'],
                    },
                    userPreferences:{
                        theme: 'dark',
                        timeZone: 'GMT-MOCK',
                        language: 'en',
                        apiCode: 'v1',
                        regionCode: 'US'
                    },
                    isLoggedIn: true
                });
                subscriber.complete();
            }, 300)
        }).pipe(tap(data => {
            if(data.isLoggedIn){
                const mode = data.userPreferences?.theme ?? 'light'; 
                setMode(mode === 'light' ? 'light' : 'dark');
            }
        }));
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

