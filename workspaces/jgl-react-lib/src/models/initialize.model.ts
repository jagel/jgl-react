export interface UserSession{
    accessToken: string;
    idToken: string;
    expiredDate: Date;
    refreshToken: string;
    sub: string;
    roles:Array<string>;
    scopes: Array<string>;
}

export interface UserProfile{
    name:string;
    email:string;
    accessClaims:Array<string>;
    picture:string;
}

export interface AppData  {
    userSession: UserSession;
    userProfile: UserProfile;
    language:string;
    gatewayUri: string;
}