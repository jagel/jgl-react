import { AppInfo, I18nCatalog, UserSessionModel } from "@jgl-react-lib/app-contexts";
import { Observable } from "rxjs";

export const useGetInitializers = () => {

     const mockInitAppInfoContext = () : Observable<AppInfo> => 
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
            }, 1000)
        });

     const mockGetUser = () : Observable<UserSessionModel> => 
        new Observable<UserSessionModel>(subscriber => {
            setTimeout(() => {
                subscriber.next({
                    userProfile: {
                        name: 'test',
                        email: 'mail@test.com',
                        username: 'username_test',
                        initials: 'TT'
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
                        theme: 'dark', // test with 'light' or 'dark'
                        timeZone: 'GMT-MOCK',
                        language: 'en',
                        apiCode: 'v1',
                        regionCode: 'US'
                    },
                    isLoggedIn: true
                });
                subscriber.complete();
            }, 1000)
        });
        
    return {
        mockInitAppInfoContext,
        mockInitI18nCatalogContext,
        mockGetUser
    }
}