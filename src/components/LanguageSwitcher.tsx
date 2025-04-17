'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages } from '../i18n/settings';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'tr';

    const switchLanguage = (newLocale: string) => {
        const newPath = pathname.replace(`/${currentLocale}`, '') || '/';
        router.push(`/${newLocale}${newPath}`);
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="flex space-x-2">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${currentLocale === lang
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
} 