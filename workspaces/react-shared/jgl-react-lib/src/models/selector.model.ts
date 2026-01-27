export interface IJglSelector<T> {
    key:string;
    value: T;
}

export class JglSelector {
    getByKey = <T,>(key:string , selector : Array<IJglSelector<T>>) : T | null =>  selector.find(sk => sk.key == key )?.value ?? null
    setSelecor = <T,>(objectItems: Record<string,T>) : Array<IJglSelector<T>> => Object.keys(objectItems).map(key => ({key, value: objectItems[key] }) as IJglSelector<T>) 
}