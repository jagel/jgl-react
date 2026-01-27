// #region Imports

// Import necessary interfaces
import { IErrorResult, IValidator } from "./form-validator.definitions";
// #endregion


/**
 * JGLForm class to manage form state and validation.
 * Uses deep equality comparison for change detection, which properly handles
 * functions, dates, undefined values, and circular references.
 */
export class JGLFormValidator<T> {
    private validators: Array<IValidator<T>> = [];


    /**
     * Add a validator to the form
     * @param validatorFn Validation function
     * @param errorCode error code for the validator
     * @param field Field to validate
     * @param args additional arguments for validator error message
     * @throws Error if a validator with the same error code and field already exists
     * @example
     * form.addValidator(
     *   (data) => data.email.includes('@'),
     *   'INVALID_EMAIL',
     *   'email'
     * );
     */
    addValidator(
        validatorFn: (data: T) => boolean,
        errorCode: string,
        field: keyof T,
        args: Array<string> | undefined = undefined) : void {

        if (this.validators.find(x => x.errorCode === errorCode && x.field === field)) {
            throw new Error(`Validator with error code ${errorCode} already exists`);
        }
        const validator: IValidator<T> = { isValidFn: validatorFn, errorCode, field, args };

        this.validators = [...this.validators, validator];
    }


    /**     * Check if a specific field has errors
     * @param displayErros Whether to consider displaying errors
     * @param key Field key to check for errors
     * @param data Current form data
     * @returns True if the field has errors and displayErros is true, otherwise false
     */
    hasFieldErrors(displayErros:boolean, key: keyof T, data:T): boolean {
        if(displayErros){
            return this.validators.some(v => v.field === key && !v.isValidFn(data));
        }
        return false;
    }


    /**
     * Get validation errors for all fields.
     * @param data Current form data
     * @returns Array of validator definitions representing the errors for all fields
     * @example
     * const errors = form.getErrors(formData);
     */
    getErrors(data: T): Array<IErrorResult<T>> {
        return this.validators
            .filter(v => !v.isValidFn(data))
            .map(v => ({ fieldName: v.field, errorCode: v.errorCode, args: v.args }) as IErrorResult<T>)
    }
    
}