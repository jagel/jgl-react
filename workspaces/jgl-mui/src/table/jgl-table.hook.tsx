// #region Imports
// React and external libraries
import { useState } from "react";

// Internal references
import { TableCustomSort, TableSort } from "./jgl-header.models";
import { JglHeaderProps } from "./jgl-table-header";
// #endregion Imports

//#region Props
export interface ITableItems{
	currentPage:number;
	rowsPerPage:number;
	searchStr:string|null;
}

export interface Pagination {
	page:number;
	recordsPerPage:number;
	intialRecordsPerPage:number;
}
export interface TableProperties<T extends Object> {
	sort:TableSort | TableCustomSort<T>;
	pagination : Pagination;
	search: string|null;
}
//#endregion Props

/**
 * 
 * @param rowPerPage *number* - Number of rows per page.
 * @param header *JglHeaderProps* - Header properties including sort defaults.
 * @returns table properties and event handlers for sorting, pagination, and searching.
 * @example
 * ```tsx
 * const [tblProps, onSortChange, onPageChange, onSearch] = useTableEvents<ITableModel>(10,tblDefaults);
 * ```
 */
const useTableEvents =<T extends Object,>(
	rowPerPage: number,
	header: JglHeaderProps) : [
	TableProperties<T>,
	(sort: TableSort | TableCustomSort<T>) => void,
	(page: number, recordsPerPage: number) => void,
	(search: string) => void
] => {
	
	//#region Initializations
	const [tableProperties,setTableProperties] = useState<TableProperties<T>>({
		sort : header.sort,
		pagination : {
			page: 1,
			recordsPerPage: rowPerPage,
			intialRecordsPerPage: rowPerPage
		},
		search:null
	});	
	//#endregion Initializations

	//#region Events
	const onSortChange = (sort: TableSort | TableCustomSort<T>) : void => {
		setTableProperties(prev => ({...prev, sort, pagination: {...prev.pagination, page:1 } }))
	}

	const onPageChange = (page: number, recordsPerPage: number) : void => {
		setTableProperties(prev => ({...prev, pagination: { ...prev.pagination, page, recordsPerPage }}))
	}

	const onSearch = (search: string) : void => {
		setTableProperties(prev => ({...prev, search, pagination: {...prev.pagination, page:1}}))
	}
	//#endregion Events

	return [tableProperties, onSortChange, onPageChange, onSearch];
}

export default useTableEvents;