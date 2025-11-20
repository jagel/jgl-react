// #region Imports
// React and external libraries
import { useEffect, useRef, useState } from "react";

// MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// JGL Library
import JglTableHeader from "@jgl-mui/table/jgl-table-header";
import useTableEvents from "@jgl-mui/table/jgl-table.hook";
import JGLTablePagination from "@jgl-mui/table/jgl-table.pagination";
import SearchInput from "@jgl-mui/table/jgl-table-search.input";
import { JGL_STYLE_Table_Toolbar } from "@jgl-mui/table/jgl-table-defaults";
import { tblSvc } from "@jgl-ui-lib/services/table.service";
import type { TableCustomSort, TableSort } from "@jgl-mui/table/jgl-header.models";

// Internal references
import type { ITableModel } from "./jgl-table.model";
import { dataCreator } from "./jgl-table.service";
import { TblMtd } from "./jgl-table.definitions";
import Typography from "@mui/material/Typography";

// #endregion Imports

const JglTableExample: React.FC = () => {

	//#region definitions
	const tblDefaults = TblMtd.headers;
	//#region definitions

	//#region Initializations
	
	const [allData, setAllData] = useState<Array<ITableModel>>([]);
	const [tblProps, onSortChange, onPageChange, onSearch] = useTableEvents<ITableModel>(TblMtd.paging.defaultRows,tblDefaults);
	const [filteredData, setFilteredData] = useState<Array<ITableModel>>([]);

	const searchRef = useRef<{ reset: () => void }>(null);
	const sortRef = useRef<{ reset: () => void }>(null);
	//#region initializtions

	//#region React hooks
	
	useEffect(() => {
		const data = dataCreator.createTableData();
		setAllData(data);
	},[]);

	useEffect(() =>{
		// Identify Sort implementation
		const customSort = tblProps.sort as TableCustomSort<ITableModel>;
		const sort = tblProps.sort as TableSort;

		const filteredData = typeof customSort.customSort === 'undefined' ?
			tblSvc.setFilteredData(allData, sort, tblProps.search) :
			tblSvc.setCustomFilteredData(allData, customSort, tblProps.search);

		setFilteredData(filteredData);
	}, [tblProps]);
	//#endregion React hooks

	//#region Events
	const handleResetTable = () : void => {
		searchRef.current?.reset();
		sortRef.current?.reset();
	}
	//#endregion Events


    //#region Render
	const tablePage = tblSvc.paginate(filteredData, tblProps.pagination.page, tblProps.pagination.recordsPerPage);

    return (
		<Box>
			<Typography variant="h6" gutterBottom>
            	Table Example
          	</Typography>
		  
			<Paper elevation={1}>
			<Toolbar sx={JGL_STYLE_Table_Toolbar}>
				<SearchInput ref={searchRef} onSearchChange={(searchStr) => onSearch(searchStr)} textPlaceHolder="search" />
				<button onClick={() => handleResetTable()}>Reset</button>
			</Toolbar>
			<TableContainer>
				<Table aria-labelledby="application-list" size={'medium'}>
					<TableHead>					
						<JglTableHeader {...tblDefaults}
							onSortChange={(key, direction) => onSortChange({orderBy:key, direction})}						
							ref={sortRef}
						/> 
					</TableHead>
					<TableBody>
						{tablePage.map((row, index) =>
							<TableRow key={index} hover>
								<TableCell align="left">...</TableCell>
								<TableCell align="left">{row.id}</TableCell>
								<TableCell align="left">{row.name}</TableCell>
								<TableCell align="left">{row.age}</TableCell>
								<TableCell align="right">{row.email}</TableCell>
								<TableCell align="left">{row.address}</TableCell>
								<TableCell align="right">{row.phone}</TableCell>
							</TableRow>
						)}
						{ filteredData.length === 0 && 
							<TableRow>
								<TableCell colSpan={tblDefaults.totalColumns} align="center" sx={{color:'gray'}} >
									No Content
								</TableCell>
							</TableRow>}
					</TableBody>
				</Table>
			</TableContainer>

			<JGLTablePagination 
				totalRows={filteredData.length}
				rowsPerPageOptions={[10,50,100]}
				page={tblProps.pagination.page}
				selectedRowPerPage={tblProps.pagination.recordsPerPage}
				onPageChange={(page, rowsPerPage) => onPageChange(page, rowsPerPage)}
			/>
		</Paper>

	</Box>
	);
    //#endregion Render
}

export default JglTableExample;
