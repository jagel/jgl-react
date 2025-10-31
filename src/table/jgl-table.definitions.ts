// #region Imports

// JGL Library
import { JglTableCreator } from "@jgl-mui/table";

// Internal references
import type { ITableModel } from "./jgl-table.model";

// #endregion Imports

export const TblMtd = {
    headers: JglTableCreator.setHeadersDefaults<ITableModel>([
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
        defaultRows: 10
    }
}