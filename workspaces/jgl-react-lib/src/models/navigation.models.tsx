export interface Navigation  {
    name: string;
    icon : string;
    order: number;
    pathRoute : string;
    navigations? : Array<Navigation>;
}