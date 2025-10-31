
// #region Imports
// MUI
import TablePagination from '@mui/material/TablePagination';
// #endregion Imports

// #region Props
export interface JGLTablePaginationProps {
    totalRows:number;
    rowsPerPageOptions:Array<number>;
    page:number;
    selectedRowPerPage:number;
    onPageChange:(page:number, rowsPerPage:number) => void;
}
// #endregion Props

/**
 * 
 * @param param0 JGLPagePaginationProps 
 * @example
 * ```tsx
 * <JGLTablePagination 
 *	    totalRows={filteredData.length}
 *	    rowsPerPageOptions={[10,50,100]}
 *	    page={tblProps.pagination.page}
 *	    selectedRowPerPage={tblProps.pagination.recordsPerPage}
 *	    onPageChange={(page, rowsPerPage) => onPageChange(page, rowsPerPage)}
 *	/>
 */
export const JGLTablePagination = ({
    totalRows,
    rowsPerPageOptions,
    page,
    selectedRowPerPage,
    onPageChange} : JGLTablePaginationProps) => {

    
	//#region Events
    const onPageChangeEvt = (selectedPage:number) : void =>{
        onPageChange(selectedPage, selectedRowPerPage);
    }

    const onRowsPerPageChange = (newRowsPerPage:string) : void =>{
        const selectedRowsPerPage = parseInt(newRowsPerPage);
        onPageChange(page, selectedRowsPerPage);
    }
	//#endregion Events

    //#region Render
    return <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalRows}
        rowsPerPage={selectedRowPerPage}
        page={page-1}
        onPageChange={(e,page) => onPageChangeEvt(page + 1)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(e.target.value)} 
    />
    //#endregion Render
}
