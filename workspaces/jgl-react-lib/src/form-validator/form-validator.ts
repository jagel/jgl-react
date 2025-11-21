// #region Imports

// Import necessary interfaces
import { IErrorResult, IJglForm, IValidator } from "./form-validator.definitions";

// #endregion

/**
 * JGLForm class to manage form state and validation
 */
export class JGLForm<T> {
    // Store the initial state of the form data as a JSON string
    initial: string;

    private validators: Array<IValidator<T>> = [];

    constructor(data: T) {
        // decouple and store the initial data state
        this.initial = JSON.stringify(data);
    }

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
        args: Array<string> | undefined = undefined): void {

        if (this.validators.find(x => x.errorCode === errorCode && x.field === field)) {
            throw new Error(`Validator with error code ${errorCode} already exists`);
        }
        const validator: IValidator<T> = { isValidFn: validatorFn, errorCode, field, args };

        this.validators = [...this.validators, validator];
    }

    /**
     * Get validation errors for a specific field
     * @param key Field key to get errors for
     * @param data Current form data
     * @returns Array of validator definitions representing the errors
     * @example
     * const errors = form.getErrors('email', formData);
     */
    getErrorsByField(key: keyof T, data: T): Array<IErrorResult<T>> {
        return this.validators
            .filter(v => v.field === key && !v.isValidFn(data)).map(v => ({ errorCode: v.errorCode, args: v.args }))
            .map(v => ({ fieldName: key, errorCode: v.errorCode, args: v.args }) as IErrorResult<T>);
    }

    /**
     * Get validation errors for a specific field
     * @param key Field key to get errors for
     * @param data Current form data
     * @returns Array of validator definitions representing the errors
     * @example
     * const errors = form.getErrors('email', formData);
     */
    getErrors(data: T): Array<IErrorResult<T>> {
        return this.validators
            .filter(v => !v.isValidFn(data))
            .map(v => ({ errorCode: v.errorCode, args: v.args }) as IErrorResult<T>)
    }

    /**
     * Evaluate and set the form data, returning its validity and change status
     * @param data data to evaluate
     * @returns IJglForm<T> object with validity and change status
     * @example
     * const formState = form.setFormData(formData);
     */
    setFormData(data: T): IJglForm<T> {
        const errors = this.getErrors(data);
        const hasChanges = this.setHasChanges(data);

        return { 
            isValid: errors.length > 0,
            hasChanges,
            errors,
            data
        };
    }

    /**
     * Update initial data state
     * @param data initial data to set
     * @example
     * form.updateInitialData(formData);
     */
    updateInitialData(data: T): void {
        this.initial = JSON.stringify(data);
    }

    private setHasChanges(data: T): boolean {
        // Compare current data with initial data pristine state
        return JSON.stringify(data) !== this.initial;
    }
}