
/** Available types of sort. */
export type JglSort = 'asc'|'desc';

/** Sorting definition, this implementation will take the field name to sort data. */
export interface JGLHeaderTable {
	key:string;
	title:React.ReactNode;
    disableSort?:boolean;
	align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

/** Sorting definition, this implementation will take the field name to sort data. */
export interface TableSort {
	orderBy: string;
	direction: JglSort
}

/** Sorting definition, this implementation will take CustomSort method to sort data. */
export interface TableCustomSort<T extends Object> extends TableSort {
	customSort: (row: T) => string;
}
