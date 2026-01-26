import { eErrorType } from "../types/error-type";
import { CollectionItem } from "./collection-item.model";

export interface JglErrorResponse
{
    errorCode : string;
    title : string;
    description : string;
    domain : string;
    errorMessages? :  CollectionItem[];
    errorType:eErrorType
}
