
export interface EndpointURL{
    url:string;
    code:string;
}

export interface AppInfo{
    appName:string;
    appVersion:string;
    defaultLanguage:string;
    securityUrl:string;
    healthySecurityService:boolean;
    apiUrl:Array<EndpointURL>;
    healthyApiService?:boolean;
}

export interface AppVersioningContextData{
    getAppInfo : () => AppInfo;
    setAppInfo : (appInfo : AppInfo) => void;
    getUrlByCode : (code:string) => string | null;
    getSecurityUrl : () => string;
}

