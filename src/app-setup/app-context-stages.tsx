// #region Imports

// React
import React from 'react';
import { map } from 'rxjs';

// MUI
import { useColorScheme } from '@mui/material';

// JGL libraries
import { EContextService, EContextTierStatus, InitContextTier, LoadingComponentProps, TIER_MSG } from '@jgl-react-lib/init-tier-component';
import { LoadingPage, ErrorPage } from '@jgl-mui/pages';
import { AppInfo, AppInfoContext, useAppInfo } from '@jgl-react-lib/app-contexts/app-info-context';
import { Appi18nContext, I18nCatalog } from '@jgl-react-lib/app-contexts/i18n-context';
import { UserSessionContext, UserSessionModel } from '@jgl-react-lib/app-contexts';
import { UseInitTierProps } from '@jgl-react-lib/init-tier-component/useInitTier';

// App imports
import { useGetInitializers } from '../hooks/get-initializers.api';

// #endregion Imports

export const AppContextStages = ({children} : React.PropsWithChildren) => {

    // #region Definitions

    // Context data states
    const [appInfo, setAppInfo] = React.useState<AppInfo>({} as AppInfo);
    const [i18nCatalog, setI18nCatalog] = React.useState<Array<I18nCatalog>>([]);
    const [userSession, setUserSession] = React.useState<UserSessionModel>({isLoggedIn:false} as UserSessionModel);

    const { mockInitAppInfoContext, mockInitI18nCatalogContext, mockGetUser } = useGetInitializers();

    // hook helpers
    const {setMode} = useColorScheme();
    const { getAppInfo } = useAppInfo(mockInitAppInfoContext, {enableLocalStorage:false, expiresInMinutes:120} );
    const userSessionWithThemeSetted = () => mockGetUser().pipe(map(usData => { 
            if(usData.isLoggedIn){
                setMode(usData.userPreferences?.theme === 'light' ? 'light' : 'dark' );
            }
            setUserSession(usData); 
        })
    );
    
    // tier definitnions
    const initAppInfo : UseInitTierProps = { service: EContextService.appInfoService, getData$: () => getAppInfo().pipe(map(appInfo => { setAppInfo(appInfo); })) };
    const initI18n : UseInitTierProps = { service: EContextService.i18nService, getData$: () => mockInitI18nCatalogContext().pipe(map(i18nCatalog => { setI18nCatalog(i18nCatalog); })) };
    const initUserSession : UseInitTierProps = { service: EContextService.sessionService, getData$: userSessionWithThemeSetted };
    // #endregion Definitions


    //#endregion Initializations
    
    // #region Render
    const loadingComponent: React.FC<LoadingComponentProps> = ({ contextTier, tierInfo }) => (
        <LoadingPage 
            percentageCompleted={tierInfo.loadingPercentage}
            title="Initializing Application"
            currentOperation={TIER_MSG.service(contextTier.contextsStatus.find(ctier => [EContextTierStatus.init, EContextTierStatus.loading].some(status => status === ctier.status)  )?.service ?? EContextService.i18nService)}
            showPercentage={true}
            minHeight="100vh"
        />
    );
    const errorComponent: React.FC<LoadingComponentProps> = () => (
        <ErrorPage 
            title="Initialization Failed"
            message="We encountered an error while setting up the application."
            details="The application failed to initialize properly. This could be due to a network issue or a temporary service problem."
            minHeight="100vh"
            showActions={false}
        />
    );
    
    return (
    <AppInfoContext appInfo={appInfo} >
        <Appi18nContext i18nCatalog={i18nCatalog} defaultLanguage='en' >
            <UserSessionContext userSession={userSession}>
                <InitContextTier 
                    contextTiers={[initAppInfo, initI18n, initUserSession]}
                    loadingComponent={loadingComponent}
                    errorComponent={errorComponent}
                    enableDebug={true}
                    >
                    {children}
                </InitContextTier>
            </UserSessionContext>
        </Appi18nContext>
    </AppInfoContext>
    );
    // #endregion Render
}

