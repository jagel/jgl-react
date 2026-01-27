export interface IJGLTableFiltering{
	currentPage:number;
	rowsPerPage:number;
	searchStr:string|null;
}

export interface TableSort<T> {
	orderBy: keyof T;
	direction: 'asc' | 'desc'
}

export interface TableCustomSort<T> extends TableSort<T> {
	customSort: (row: T) => string;
}


export interface Pagination {
	page:number;
	recordsPerPage:number;
	initialRecordsPerPage:number;
}

export interface TableProperties<T> {
	sort:TableSort<T> | TableCustomSort<T>;
	pagination : Pagination;
	search: string|null;
}