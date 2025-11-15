export interface IValidator<T>{
    isValid:(data: T) => boolean
}
