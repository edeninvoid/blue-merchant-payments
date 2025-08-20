import { usePathname, useRouter } from 'next/navigation';
import { useHeaderTitleStore } from '@/store/common';
import { useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';

const useHeader = () => {
  const { back, push } = useRouter();

  const pathname = usePathname();
  const pathLang = pathname.split('/')[1];
  const isLocaleRoot =
    pathLang in SUPPORTED_LANGUAGES && pathname === `/${pathLang}`;
  const isOrderPath = pathname.includes('/order');

  const headerTitle = useHeaderTitleStore(state => state.title);

  const currentLang = pathLang in SUPPORTED_LANGUAGES ? pathLang : 'ko';
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    const langKeys = Object.keys(SUPPORTED_LANGUAGES).join('|');
    const langRegex = new RegExp(`^/(${langKeys})`);

    const newPathname = pathname.replace(langRegex, `/${selectedLang}`);
    push(newPathname);
  };

  return {
    isLocaleRoot,
    isOrderPath,
    back,
    title: headerTitle,
    selectProps: { currentLang, handleChange },
  };
};

const useSetHeaderTitle = (title: string) => {
  const setHeaderTitle = useHeaderTitleStore(state => state.setTitle);

  useEffect(() => {
    setHeaderTitle(title);
  }, [setHeaderTitle, title]);
};

export { useHeader, useSetHeaderTitle };
