// #region Imports
// React and external libraries
import { useEffect, useState,forwardRef, useImperativeHandle } from 'react';

// MUI
import Icon from '@mdi/react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { mdiMagnify } from '@mdi/js';

// #endregion Imports

/**
 * Search input component for table filtering.
 * Provides a text input field with a magnifying glass icon.
 * Resets input on 'Escape' key press and notifies parent component of input changes.
 * @param param0 Component props including onSearchChange callback and textPlaceHolder.
 * @param ref Forwarded ref to allow parent component to reset the input field.
 * @example 
 * ```tsx
 * <SearchInput ref={searchRef} onSearchChange={(searchStr) => onSearch(searchStr)} textPlaceHolder="search" />
 * ```
 */
const SearchInput = forwardRef<
    { reset: () => void },
    {
        onSearchChange: (inputValue: string) => void;
        textPlaceHolder: string;
    }
>(({ onSearchChange, textPlaceHolder }, ref) => {

	//#region Initializations
    const [searchValue, setSearchValue] = useState('');
	//#endregion Initializations

	//#region React hooks
    useEffect(() => {
        onSearchChange(searchValue);
    }, [searchValue]);

    useImperativeHandle(ref, () => ({
        reset: () => setSearchValue('')
    }));
	//#endregion React hooks

	//#region Events
    const onkeydown = (code: string): void => {
        if (code === 'Escape') {
            setSearchValue('');
        }
    };

    const onInputChange = (value: string): void => {
        setSearchValue(value);
    };
	//#endregion Events

    //#region Render
    return (
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
            <InputBase
                fullWidth
                onKeyDown={(evt) => onkeydown(evt.code)}
                sx={{ ml: 1, flex: 1 }}
                placeholder={textPlaceHolder}
                inputProps={{ 'aria-label': 'search table input' }}
                onChange={(evt) => onInputChange(evt.target.value ?? '')}
                value={searchValue}
            />
            <Icon path={mdiMagnify} size={1} />
        </Paper>
    );
    //#endregion Render
});

export default SearchInput;