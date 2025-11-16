import { AccessValidationType } from "./user-session.definitions";


export interface UserProfile{
    name:string;
    email:string;
    username:string;
    initials:string;
}

export interface AccessData{
    accessToken: string;
    idToken: string;
    expiredDate: Date;
    refreshToken: string;
    sub: string;
    roles:Array<string>;
    roleAccess: Array<string>;
}

export interface UserPreferences{
    theme: string;
    timeZone: string;
    language: string;
    apiCode:string;
    regionCode:string;
}

export interface UserSessionModel {
    userProfile?: UserProfile;
    accessData?: AccessData;
    userPreferences?: UserPreferences;
    isLoggedIn: boolean;
}


export interface UserSessionContextModel {
    getUserProfile(): UserProfile;
    getAccessData(): AccessData;
    getUserPreferences(): UserPreferences;
    isUserInRoles(roles: Array<string>,validation: AccessValidationType ): boolean;
    hasUserAccess(accessCodes: Array<string>,validation: AccessValidationType ): boolean;
    isUserLoggedIn() : boolean;
}