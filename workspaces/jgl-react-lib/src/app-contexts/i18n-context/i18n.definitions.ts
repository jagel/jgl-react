import { of } from "rxjs";
import { I18nCatalog } from "./i18n.models";

export const LANGUAGE = {
    KEY: 'language',
};

export type LanguageType = 'en' | 'es';

export interface iI18nContext {
    language: LanguageType;
    i18nCatalog: Array<I18nCatalog>;
    setLanguage: (langugae: LanguageType) => void;
    geti18nText: (textKey: string) => string;
}

export class I18nContextDefaults implements iI18nContext {
    language: LanguageType = 'en';
    i18nCatalog: Array<I18nCatalog> = [];
    initCatalog = () => of<Array<I18nCatalog>>([]);
    setLanguage = (langugae: LanguageType) => this.language = langugae;
    geti18nText = (textKey: string) => this.i18nCatalog.find((x) => x.language === this.language && x.key === textKey)?.value ?? textKey;
}
