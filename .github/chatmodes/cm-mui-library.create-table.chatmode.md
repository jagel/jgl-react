---
description: 'Chat mode that wraps MUI into internal components that encapsulate and create standards for future implementation'
tools: ['edit', 'new']
---
Create a new component that will display a table using MUI and internal library using a class or interface


## File name requeriments

The file name created for typescript and TSX files have to follow the following naming convention:
- The name should contain only lower case words.
- Spaces are represented with dash ``-``.

## Component creation requeriment

The components should follow the following the following conventions:

### Imports
- The import section should be wrapped in a ``// #region Imports`` at the begining and ``// #endregion Imports`` at the end of the imports
- The import section should be organized in the following categories
    -- ``// React and external libraries``: For react libraries and external libraries 
    -- ``// MUI``: For Mui imports. The reference path for this case always starts with `@mui/material/**`
    -- ``// JGL Library``: For internal libraries. The reference path for this case always starts with `@jgl-*/**`
    -- ``// Internal references``: For all the references that belong to the application, excluding libraries.

Example:
```typescript
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


// JGL Library
import { JglTableHeader } from "@jgl-mui/table/jgl-table-header";
import { tblSvc } from "@jgl-ui-lib/services/table.service";
import type { TableCustomSort, TableSort } from "@jgl-mui/table/jgl-header.models";
import { useTableEvents } from "@jgl-mui/table/jgl-table.hook";
import SearchInput from "@jgl-mui/table/jgl-table-search.input";
import { JGL_STYLE_Table_Toolbar } from "@jgl-mui/table/jgl-table-defaults";

// Internal references
import type { ITableModel } from "./jgl-table.model";
import { dataCreator } from "./jgl-table.service";
import { TblMtd } from "./jgl-table.definitions";
import { JGLTablePagination } from "@jgl-mui/table/jgl-table.pagination";

// #endregion Imports
```

## Component Regions

The component can contain the following regions

- ``//#region Imports`` : Contains all the import references
- ``//#region Definitions`` : Contains all the definitions and initialization of the component. If Redux is used the data is retreived in here
- ``//#region Initializations`` : React Use states are defined here,
- ``//#region React hooks`` : React hooks as useEffect, useMemo
- ``//#region Events``: Methods that have an interaction with UI events
- ``//#region Render``: Return TSX 

All regions should be closed appropriately and it should include the name of the region that is closing for example the region definitions should be closed as ``//#endregion Definitions``

## Table creation Requeriments:
- The prompt should include the name of the component name. With the component name a new file should be crated with the following name <component-name>.table.tsx.
- The prompt should include the model that is going to be used as a reference. The model should be in a saved file in order to use it as a reference in this new component.

Here is the example of a class or interface that will be used to create a table

```typescript 
export interface IUserTable {
    // column for action buttons : - align : left, disable sort
    id: string; // Id , align : left , disable sort, 
    name: string; // Name, align : left
    age: number; // Age, aling : right
    email: string; // E-Mail, align: left
    address: string; // Address - align : left
    phone: string; // Phone - align : right
    isInternal: boolean; // ignore in table
}
```
The commented lines are important to make desicion in the table creation. Here is the definition of the commented information

- The table can add additional columns if it's required for action buttons this is defined with the text ``column for action buttons``
- The fields should contain a commented definitions next to the end of the definition as follow. Every definition is separated by a coma ``,``
    - First element is the name of the field that is going to be displayed. In the example the field ``name`` will display in the header ``Name``
    - The definition ``align:`` defines the alignment of the header, available options: ``inherit, left, center, right, justify``
    - The definition ``disable sort`` will add the disabled option in the definition in the component

Using the model ``IUserTable`` as example we can generate a table component with the name ``UserInformation``, the implementation should do the following:
1. Validate the model used as reference has the comments required to generate the table. If the model does not have comments, you cannot create and you can show an example, or show what is missing in the model.
2. Validate component name is defined otherwise it should be requested.
3. Create the new metadata file that contains the table definition with the name ``<component-name>.mtd.ts``, for this example the component name should be ``user-information.mtd.ts``.
The model definitions with the comments will be use to create the metadata file. For this example here is how the metadata should be created:

```typescript
// #region Imports

// JGL Library
import { JglTableCreator } from "@jgl-mui/table";

// Internal references
import type { IUserTable } from "./user-table.model";

// #endregion Imports

export const TblMtd = {
    headers: JglTableCreator.setHeadersDefaults<IUserTable>([
		{key: 'action', title: "Action",  disableSort: true, align: 'left'},
		{key: 'id', title: "Id", align: 'left'},
		{key: 'name', title: "Name", align: 'left'},
		{key: 'age', title: "Age", align: 'left'},
		{key: 'email', title: "Email", align: 'right'},
		{key: 'address', title: "Address", align: 'left'},
		{key: 'phone', title: "Phone", align: 'right'},
	], 
	// Sort defaults
	{
		orderBy:'name',
		direction :'desc'
	}),
    paging: {
		//Paging default is always 10
        defaultRows: 10
    }
}
```


4. Create the new component, for this example the component name should be ``user-information.table.tsx``
5. The component should be created as follow

```typescript
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


// JGL Library
import { JglTableHeader } from "@jgl-mui/table/jgl-table-header";
import { tblSvc } from "@jgl-ui-lib/services/table.service";
import type { TableCustomSort, TableSort } from "@jgl-mui/table/jgl-header.models";
import { useTableEvents } from "@jgl-mui/table/jgl-table.hook";
import SearchInput from "@jgl-mui/table/jgl-table-search.input";
import { JGL_STYLE_Table_Toolbar } from "@jgl-mui/table/jgl-table-defaults";

// Internal references
import type { ITableModel } from "./jgl-table.model";
import { dataCreator } from "./jgl-table.service";
import { TblMtd } from "./jgl-table.definitions";
import { JGLTablePagination } from "@jgl-mui/table/jgl-table.pagination";

// #endregion Imports


const UserInformationTable = () => {
	//#region Definitions
	const tblDefaults = TblMtd.headers;
	//#region Definitions

	//#region Initializations

	const [allData, setAllData] = useState<Array<IUserTable>>([]);
	const [tblProps, onSortChange, onPageChange, onSearch] = useTableEvents<IUserTable>(TblMtd.paging.defaultRows,tblDefaults);
	const [filteredData, setFilteredData] = useState<Array<IUserTable>>([]);

	const searchRef = useRef<{ reset: () => void }>(null);
	const sortRef = useRef<{ reset: () => void }>(null);

	//#region Initializations

	//#region React hooks
	useEffect(() => {
		// <your-data-request-here>
	},[]);

	useEffect(() =>{
		// Identify Sort implementation
		const customSort = tblProps.sort as TableCustomSort<IUserTable>;
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

    return <Paper elevation={1}>
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
								No Conent
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
	</Paper>;
    //#endregion Render
}

export default UserInformationTable;

```