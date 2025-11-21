import { JglErrorResponse } from "./jgl-error-response.model";

export interface JGLBaseResponse  {
    hasErrors:boolean;
    errorResponse?:JglErrorResponse;
    statusCodeResponse?: number;    
}

export interface JGLModelResponse<TModelResponse> extends  JGLBaseResponse {
    data : TModelResponse | null;
}

export interface JGLBooleanResponse extends JGLBaseResponse{
    transactionCompleted : boolean;
}