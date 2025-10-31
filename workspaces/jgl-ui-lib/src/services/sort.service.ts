// #region Imports
// Internal references
import { SortProps } from "../definitions/sort.models";
// #endregion Imports

/**
 * Service to manage sorting operations.
 * @category Services
 */
export class SortService{

    customSortBy<T extends Object, R>(data:Array<T>, sortItem: SortProps, customValue: (row:T) => R) : Array<T> {
         if(data.length === 0){
            return [];
        }
        
        const sortOperator = sortItem.direction === 'asc' ? 1 : -1;
        const unorderArray = [...data];
        
        const orderedAray = unorderArray.sort((a,b) => {
            const valA : R = customValue(a);
            const valB : R = customValue(b);
            if(valA > valB) return -1 * sortOperator;
            else if(valA < valB) return 1 * sortOperator;
            else return 0
        });
        return orderedAray;
    }
    
    sortBy<T extends Object>(data:Array<T>, sortItem: SortProps) : Array<T> {
        if(data.length === 0){
            return [];
        }
        const key = sortItem.orderBy as keyof T;
        return this.customSortBy(data, sortItem, (row) => row[key]);
    }

    
}

export const sortSvc = new SortService();
