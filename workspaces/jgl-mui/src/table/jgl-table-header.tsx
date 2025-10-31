// #region Imports
// React and external libraries
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

// MUI
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

// Internal references
import { JGLHeaderTable, JglSort, TableSort } from "./jgl-header.models";
// #endregion Imports

//#region Props
export interface JglHeaderProps{
	// Sort properties: active field and direction
	sort: TableSort;
	// Table header items
    headers: Array<JGLHeaderTable>;
	// Toal columns used in colSpan rows
    totalColumns: number
}

export interface TableHeaderProps extends JglHeaderProps{
	//Click event sent to implementation component
	onSortChange:(key:string, sort: JglSort) => void;
}
//#endregion Props

	
export const JglTableHeader = forwardRef<
	{ reset: () => void },
	{
		sort: TableSort;
		headers: Array<JGLHeaderTable>;
		onSortChange:(key:string, sort: JglSort) => void;
	}	
>(({ sort, headers, onSortChange }, ref) => {

	//#region definitions
	const defaultColumn = headers.findIndex(x=>x.key === sort.orderBy);
	//#endregion definitions

	//#region Initializations
	const [evtSort,setEvtSort] = useState<{index:number, descDirection: boolean}>({
		index:defaultColumn,
		descDirection: sort.direction === 'desc'}
	);	
	//#endregion Initializations

	//#region React hooks
	useEffect(() => {
		onSortChange(headers[evtSort.index].key, evtSort.descDirection ? 'desc' : 'asc' );
	},[evtSort]);

	useImperativeHandle(ref, () => ({
		// refreshFlag is trigered when output component is reseting the changes
		reset: () => setEvtSort({
			index:defaultColumn,
			descDirection: sort.direction === 'desc'
		})
	}));
	//#endregion React hooks

	//#region Events
	const onHeaderSortChange = (index:number) => {
		setEvtSort(prev => prev.index == index ?
			// if same column keep column and change the direction
			{...prev, descDirection: !prev.descDirection}:
			// if different column change column and keep direction
			{...prev,index }
		);
	}
	//#endregion Events

    //#region Render
	
	//Column style for disabled sort
	const columnLabel = (row: JGLHeaderTable, index:number) => (
		<TableCell key={index} align={row.align}>
			{row.title}
        </TableCell>);
        
	//Column style for enable sort event
    const sortLabel = (row: JGLHeaderTable, index:number) => (
		<TableCell key={index} align={row.align}>
			<TableSortLabel active={index === evtSort.index}
				direction={evtSort.descDirection ? 'desc':'asc'}
				onClick={() => onHeaderSortChange(index)}
			>
				{row.title}
			</TableSortLabel>
		</TableCell>);

	return <TableRow>
		{headers.map((row,index) => row.disableSort === true ? columnLabel(row,index): sortLabel(row,index)) }
	</TableRow>
    //#endregion Render
	
});

export default JglTableHeader;