// #region Imports
// Internal references
import { JGLHeaderTable, TableSort } from "./jgl-header.models";
import { JglHeaderProps } from "./jgl-table-header";
// #endregion Imports

/**
 * Utility class for creating table header definitions with default settings.
 */
const JglTableCreator = {
    setHeadersDefaults : <T extends Object>(
        headers: Array<JGLHeaderTable>,
        sort: TableSort
    ) : JglHeaderProps => ({
            headers: headers,
            sort: sort,
            totalColumns: headers.length??0
        }) as JglHeaderProps,
}

export default JglTableCreator;