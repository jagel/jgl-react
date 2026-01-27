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

export interface IJglFormContext<T> {
    isValid: boolean;
    hasChanges: boolean;
    displayErrors: boolean;
    errors: Array<IErrorResult<T>>;
}