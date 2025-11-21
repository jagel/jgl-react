import { JglErrorResponse } from "./jgl-error-response.model";

export interface JGLBaseReponse  {
    hasErrors:boolean;
    errorResponse?:JglErrorResponse;
    statusCodeReponse?: number;    
}

export interface JGLModelResponse<TModelResponse> extends  JGLBaseReponse {
    data : TModelResponse | null;
}

export interface JGLBooleanResponse extends JGLBaseReponse{
    transactionCompleted : boolean;
}