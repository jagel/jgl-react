// #region Imports
// React
import { Observable, of, tap } from "rxjs";

// JGL Library
import { AppInfo } from "./app-info.definitions";
import { useLocalStorage } from "../../hooks";
import { JglConstants } from "../../definitions";
// #endregion Imports

/**
 * useAppInfo hook to manage application information.
 * @param getAppInfo - Function that returns an Observable emitting AppInfo data.
 * @param defaults - Optional settings for local storage and expiration.
 * @returns An object containing the getAppInfo method to retrieve application information.
 */
const useAppInfo = (
    getAppInfo: () => Observable<AppInfo>,
    defaults? : {
        enableLocalStorage?:boolean,
        expiresInMinutes?:number
    }
) : 
{
    getAppInfo : () => Observable<AppInfo>
} => {
    const { setOrUpdateLocalStorage, tryGetLocalStorage } = useLocalStorage();
    const enableLocalStorage = defaults?.enableLocalStorage ?? false;
    const expiresInMinutes = defaults?.expiresInMinutes ?? 60;

    const getAppInfoSub = () : Observable<AppInfo> => {
        const appData = tryGetLocalStorage<AppInfo>(JglConstants.localStorage.appVersion);
        // Get data using observable
        if(appData == null || !enableLocalStorage){
            return getAppInfo().pipe(tap(appInfo => {
                // Store in local storage if required
                if(enableLocalStorage){
                    setOrUpdateLocalStorage<AppInfo>(
                        JglConstants.localStorage.appVersion,
                        appInfo,
                        expiresInMinutes
                );
                }
            }));
        }
        // Return from local storage
        else{
            return of(appData);
        }
    };

    return { getAppInfo: getAppInfoSub };
}

export default useAppInfo;