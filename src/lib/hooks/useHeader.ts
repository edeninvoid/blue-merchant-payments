import { usePathname, useRouter } from 'next/navigation';
import { useHeaderTitleStore } from '@/store/common';
import { useEffect } from 'react';
import { routing } from '@/i18n/routing';

const useHeader = () => {
  const { back } = useRouter();
  const pathname = usePathname();
  // const pathLang = pathname.split('/')[1];

  // const isRootPath =
  //   pathLang in SUPPORTED_LANGUAGES && pathname === `/${pathLang}`;
  const isRootPath = routing.locales.some(locale =>
    pathname.endsWith(`/${locale}`),
  );
  const isOrderPath = pathname.includes('/order');
  // const currentLang = pathLang in SUPPORTED_LANGUAGES ? pathLang : 'ko';
  //
  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedLang = e.target.value;
  //   const langKeys = Object.keys(SUPPORTED_LANGUAGES).join('|');
  //   const langRegex = new RegExp(`^/(${langKeys})`);
  //
  //   const newPathname = pathname.replace(langRegex, `/${selectedLang}`);
  //   push(newPathname);
  // };

  return {
    router: { back },
    conditionalPath: { isRootPath, isOrderPath },
    // selectProps: { currentLang, handleChange },
  };
};

const useSetHeaderTitle = (title: string) => {
  const setHeaderTitle = useHeaderTitleStore(state => state.setTitle);

  useEffect(() => {
    setHeaderTitle(title);

    return () => setHeaderTitle('');
  }, [setHeaderTitle, title]);
};

export { useHeader, useSetHeaderTitle };
