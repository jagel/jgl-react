// #region Imports
// React
import React, { createContext, useEffect, useState } from "react";
import { Observable } from "rxjs";

// App libraries
import { I18nCatalog, I18nContext } from "./i18n.models";
import { LANGUAGE, LanguageType } from "./i18n.definitions";
import { ContextTier, ContextTierMessage, EContextService, EContextTierStatus } from "../../init-tier-component";
// #endregion Imports

// #region interfaces
export interface Appi18nContextProps {
	initCatalog: () => Observable<Array<I18nCatalog>>;
	defaultLanguage?: LanguageType;
	onTierChange: (tier: ContextTier) => void;
	children: any;
	contextTiers: ContextTierMessage;
}
// #endregion definitions


/**
 * 
 * @param props 
 * @see {@link Appi18nContextProps  | the @internal tag}
 * @returns Context
 */
export const Appi18nContext : React.FC<Appi18nContextProps> = ({
	initCatalog,
	onTierChange,
	contextTiers,
	children,
	defaultLanguage = 'en'
}) => {
	// #region Definitions
	const [language, setLanguage] = useState<LanguageType>(defaultLanguage);
	const [i18nCatalog, setI18nCatalog] = useState<Array<I18nCatalog>>([]);
	// #endregion Definitions

	// #region react hooks
	useEffect(() => {
		const i18Service = contextTiers.contextsStatus.find(fi => fi.service === EContextService.i18nService);
		
		if (i18Service?.status === EContextTierStatus.init) {				
			const languagePersisted = localStorage.getItem(LANGUAGE.KEY) as LanguageType | null;

			if (!languagePersisted) {
				localStorage.setItem(LANGUAGE.KEY, language);
			} else {
				setLanguage(languagePersisted);
			}

			initCatalog().subscribe({
				next: (i18ncatalog) => {
					// Set i18n catalog
					setI18nCatalog(i18ncatalog);
					// Update tier status
					onTierChange({ service: EContextService.i18nService, status: EContextTierStatus.completed });
				}, error: () => {
					// Update tier status
					onTierChange({ service: EContextService.i18nService, status: EContextTierStatus.failed });
				}
			});
		}				
	}, [contextTiers]);
	// #endregion react hooks

	// #region methods
	const geti18nText = (textKey: string): string => {
		let textValue = i18nCatalog.find((x) => x.language === language && x.key === textKey);

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

const JglI18nContext = createContext<I18nContext>({
	language : 'en',
	i18nCatalog : [],
	setLanguage: () => {},
	geti18nText: () => 'unknown'
});