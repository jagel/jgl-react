import { eErrorType } from "../types/error-type";

export interface JglErrorResponse
{
    errorCode : string;
    title : string;
    description : string;
    domain : string;
    errorMessages? :  Record<string,string>;
    errorType:eErrorType
}
