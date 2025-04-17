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

    const languageEntries = Object.entries(languages);

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="flex space-x-2">
                {languageEntries.map(([code, name]) => (
                    <button
                        key={code}
                        onClick={() => switchLanguage(code)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${currentLocale === code
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
} 