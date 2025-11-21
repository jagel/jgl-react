// #region Imports
// React
import { useContext } from "react";

// JGL Library
import { JglI18nContext } from "../app-contexts/i18n-context/i18n.context";

// #endregion Imports

// #region Definitions
export interface I18nTextProps {
    textKey: string;
    defaultText?: string;
    params?: string[];
}
// #endregion Definitions

/**
 * I18nText component to render internationalized text based on the provided key and parameters.
 * @param props - The properties including the text key and optional parameters for formatting.
 * @returns The translated text with parameters replaced, or the original key if translation is not found.
 */
export const I18nText = ({ textKey, defaultText, params }: I18nTextProps) => {
    // #region Initializations
    const { language, i18nCatalog, showWarning } = useContext(JglI18nContext);

    var i18nValue = i18nCatalog.find(x => x.key == textKey && x.language == language)?.value ?? null;
    // #endregion Initializations

    // Validation flow
    if (i18nValue == null) {
        if (showWarning) console.warn("Translation not found or declare multiple times, using code sended", 'useI18n', { code: textKey, language })
        return defaultText ?? textKey;
    }

    // Replace params if any token exit
    const textValue = params?.reduce((
        accumulator,
        currentValue,
        index) => accumulator.replace(`{${index}}`, currentValue),
    i18nValue ?? '') ?? i18nValue;

    // Return the final text value
    return textValue;
}
