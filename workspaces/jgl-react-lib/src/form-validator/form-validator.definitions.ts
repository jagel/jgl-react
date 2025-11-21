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
    event: (data: T) => boolean;
    field: keyof T;
}


