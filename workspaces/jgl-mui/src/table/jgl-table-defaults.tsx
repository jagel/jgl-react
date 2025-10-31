
// #region Imports
// MUI
import { SxProps, Theme } from "@mui/material/styles";
// #endregion Imports


/**
 * Style configuration for the table toolbar component.
 * 
 * Provides flexbox layout with end justification and gap spacing between toolbar elements.
 * 
 * @example
 * ```tsx
 * // Apply to Toolbar component
 * <Toolbar sx={JGL_STYLE_Table_Toolbar}>
 *      <SearchInput ref={searchRef} onSearchChange={(searchStr) => onSearch(searchStr)} textPlaceHolder="search" />
 * </Toolbar>
 * ```
 */
export const JGL_STYLE_Table_Toolbar : SxProps<Theme> = { display:"flex", justifyContent:"end", gap:1};
