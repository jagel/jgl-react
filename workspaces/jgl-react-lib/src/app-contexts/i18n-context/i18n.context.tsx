// #region Imports
// React
import React, { createContext, useEffect, useState } from "react";

// App libraries
import { I18nCatalog, I18nContext } from "./i18n.models";
import { LANGUAGE, LanguageType } from "./i18n.definitions";
// #endregion Imports

// #region interfaces
export interface Appi18nContextProps {
	i18nCatalog: Array<I18nCatalog>;
	defaultLanguage?: LanguageType;
	children: any;
}
// #endregion definitions

/**
 * 
 * @param props 
 * @see {@link Appi18nContextProps  | the @internal tag}
 * @returns Context
 */
export const Appi18nContext : React.FC<Appi18nContextProps> = ({
	i18nCatalog,
	children,
	defaultLanguage = 'en'
}) => {
	// #region Definitions
	const [language, setLanguage] = useState<LanguageType>(defaultLanguage);
	const [i18nCatalogData, setI18nCatalogData] = useState<Array<I18nCatalog>>(i18nCatalog);
	// #endregion Definitions

	// #region react hooks
	useEffect(() => {
		setI18nCatalogData(i18nCatalog);
	}, [i18nCatalog]);
	// #endregion react hooks

	// #region methods
	const geti18nText = (textKey: string): string => {
		let textValue = i18nCatalogData.find((x) => x.language === language && x.key === textKey);

		if (!textValue) {
			console.warn(`${textKey} does not exist in i18n catalog`);
		}

		return textValue?.value ?? textKey;
	}

	const persistLanguage = (language: LanguageType) => {
		localStorage.setItem(LANGUAGE.KEY, language);
		setLanguage(language);
	}
	// #endregion methods

	// #region render
	return <JglI18nContext.Provider value={{
		language,
		i18nCatalog,
		setLanguage: (language: LanguageType) => persistLanguage(language),
		geti18nText: (textKey: string) => geti18nText(textKey)
	}}>
		{children}
	</JglI18nContext.Provider>
	// #endregion render
}

export const JglI18nContext = createContext<I18nContext>({
	language : 'en',
	i18nCatalog : [],
	setLanguage: () => {},
	geti18nText: () => 'unknown'
});