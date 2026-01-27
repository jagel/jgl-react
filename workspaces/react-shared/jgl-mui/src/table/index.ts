export type {
    JglSort,
    JGLHeaderTable,
    TableSort,
    TableCustomSort

} from './jgl-header.models';

export {
    JGL_STYLE_Table_Toolbar
}  from './jgl-table-defaults';

export type { JglHeaderProps, TableHeaderProps } from './jgl-table-header';
export { default as JglTableHeader } from './jgl-table-header';

export { default as SearchInput } from './jgl-table-search.input';

export { default as useTableEvents } from './jgl-table.hook';
export type { 
    ITableItems,
    Pagination,
    TableProperties
 } from './jgl-table.hook';

 export type { JGLTablePaginationProps } from './jgl-table.pagination';
export { default as JGLTablePagination } from './jgl-table.pagination';

export { default as JglTableCreator } from './jgl-table.service';
