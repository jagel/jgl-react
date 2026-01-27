// #region Imports
// Internal references
import { SortService } from "./sort.service";
// #endregion Imports

/**
 * Service to manage table operations like sorting, pagination, and searching.
 * @category Services
 */
export class TableService extends SortService {

    paginate<T extends object>(arrayData: Array<T>,page:number, rowsPerPage:number): Array<T>{
        const data = [...arrayData];
        const maxPage = this.totalPages(data.length, rowsPerPage);
        //Validate invalid pages lower than 1
        let pageRequest = page < 1 ? 1 : page;
        // validate invalid higher pages than maxPages
        pageRequest = pageRequest > maxPage ? maxPage : pageRequest;

        const start = (pageRequest*rowsPerPage) - rowsPerPage
        const end  = data.length < (pageRequest * rowsPerPage) ? data.length : (pageRequest * rowsPerPage);
        return [...data.splice(start, end)];
    }

    totalPages(totalRecords:number, rowsPerPage:number){
        const hasDecimal = (total:number) : boolean => total % 1 !== 0;
        const totalPages = Math.trunc(totalRecords/rowsPerPage) + (hasDecimal(totalRecords/rowsPerPage) ? 1:0);
        return totalPages;
    }

    searchInData<T extends Object>(key:string, data:Array<T> ) : Array<T> {
        var filetedData = data.filter(row => Object.values(row).some(celValue => {
            if(celValue === undefined || celValue === null) return false;
            else return celValue.toString().toLowerCase().includes(key.toLocaleLowerCase());
            }
        )) ?? [];
        return [...filetedData];
    }

    setFilteredData<T extends Object>(
        data:Array<T>,
        sort: {direction:'asc'|'desc', orderBy: string},
        searchFilter: string | null = ''
    ) : Array<T> {
        const sFilter = searchFilter ?? '';
        if(data.length === 0){
            return [];
        }
        let filteringData = [...data];

        // If search filter is enable keep filtered rows

        if(sFilter.toString() !== '') {
            filteringData = this.searchInData(sFilter, filteringData);
        }

        if(data.length === 0){
            return [];
        }

        // Sorting filtering data
        filteringData = this.sortBy(filteringData, {orderBy: sort.orderBy, direction: sort.direction });

        return filteringData;
    }

    setCustomFilteredData<T extends Object>(
        data:Array<T>,
        sort: ({direction:'asc'|'desc', orderBy: string, customSort: (row:T)=>string}),
        searchFilter: string | null
    ) : Array<T> {
        const sFilter = searchFilter??'';
        if(data.length === 0){
            return [];
        }
        let filteringData = [...data];

        // If search filter is enable keep filtered rows

        if(sFilter.toString() !== '') {
            filteringData = this.searchInData(sFilter, filteringData);
        }

        // Sorting filtering data
        filteringData = this.customSortBy(filteringData, {orderBy: sort.orderBy, direction: sort.direction }, sort.customSort );

        // paginate 
        return filteringData;
    }
    
}

export const tblSvc = new TableService();
