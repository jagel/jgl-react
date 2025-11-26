export interface IJglForm<T>{
    isValid:boolean;
    hasChanges:boolean;
    data:T;
}

export interface IValidatorDef {
    errorCode: string;
    args?: Array<string>;
}

export interface IValidator<T> extends IValidatorDef {
    isValidFn: (data: T) => boolean;
    field: keyof T;
}


export interface IErrorResult<T>{
    fieldName: keyof T;
    errorCode: string;
    args?: Array<string>;
}