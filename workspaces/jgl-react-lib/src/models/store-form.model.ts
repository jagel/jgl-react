export interface IFormApplication<TStore> {
    data?:TStore,
    isValid:boolean,
    hasChanges:boolean
}