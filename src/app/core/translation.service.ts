import { Injectable, signal } from '@angular/core';
import { EN_TRANSLATIONS } from './translations.en';
import { DE_TRANSLATIONS } from './translations.de';

export type AppLang = 'en' | 'de';

type LangTable = Record<string, string>;
type AllTranslations = Record<AppLang, LangTable>;

const TRANSLATIONS: AllTranslations = {
    en: EN_TRANSLATIONS,
    de: DE_TRANSLATIONS,
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
    readonly lang = signal<AppLang>(this.loadLang());

    constructor() {
        this.updateHtmlLang(this.lang());
    }

    getLang(): AppLang {
        return this.lang();
    }

    setLang(lang: AppLang): void {
        this.lang.set(lang);
        localStorage.setItem('lang', lang);
        this.updateHtmlLang(lang);
    }

    isGerman(): boolean {
        return this.lang() === 'de';
    }

    t(key: string): string {
        const table = TRANSLATIONS[this.lang()];
        return table[key] ?? key;
    }

    private loadLang(): AppLang {
        const stored = localStorage.getItem('lang') as AppLang | null;
        return stored === 'de' ? 'de' : 'en';
    }

    private updateHtmlLang(lang: AppLang): void {
        document.documentElement.lang = lang;
    }
}
