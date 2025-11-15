export interface IMetadataPage {
    title:string;
    path:string;
    icon?:string;
    roles:Array<string>;
    hideTitle?:boolean;
    breadCrumb?:Array<IMetadataPage>;
    children?:React.ReactNode;
    topSection?:React.ReactNode
}