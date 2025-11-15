import { Observable } from "rxjs";
import { AppInfo } from "../../models/app-Info.model";
import { ContextTierMessage } from "../../init-tier-component";
import { ContextTier } from "../../init-tier-component";

export interface iAppVersioningContextData{
    appInfo : AppInfo;
}

export interface AppVersioningContextProps {
    expiresInMinutes?: number;
    contextTiers: ContextTierMessage;
    setData: () => Observable<iAppVersioningContextData>;
    onTierChange: (tier : ContextTier) => void;
    children: React.ReactNode;
}
