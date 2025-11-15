import { AppData } from "../../models/initialize.model";

export class UserSessionModel {
    public appData : AppData | null = null;
    public get sessionValid() : boolean { return this.appData != null; }

    constructor(appData?: AppData) {
        this.appData = appData ?? null;
    }
}