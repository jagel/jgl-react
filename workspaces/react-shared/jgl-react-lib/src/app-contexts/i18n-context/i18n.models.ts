import { LanguageType } from "./i18n.definitions";

export interface I18nContext {
    language: LanguageType;
    i18nCatalog: Array<I18nCatalog>;
    showWarning?: boolean;
    setLanguage: (language: LanguageType) => void;
    geti18nText: (textKey: string) => string;
}

export interface I18nCatalog {
    language: string;
    key: string;
    value: string;
}

export interface iJgli18nContext {
    changeorSetLanguage: (language: LanguageType) => void;
    language: LanguageType;
    i18nCatalog: Array<I18nCatalog>;
}