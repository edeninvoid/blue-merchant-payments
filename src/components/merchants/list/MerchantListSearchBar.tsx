import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MerchantListRequestParams } from '@/types/merchant';
import SearchGlass from '@/components/_icons/SearchGlass';
import { useTranslations } from 'next-intl';

export default function MerchantListSearchBar({
  onSearch,
}: {
  onSearch: Dispatch<SetStateAction<MerchantListRequestParams | undefined>>;
}) {
  const t = useTranslations('MerchantListSearchBar');
  const [query, setQuery] = useState<MerchantListRequestParams['query']>('');
  const [sort, setSort] = useState<MerchantListRequestParams['sort']>('name');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, sort });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({ query, sort });
    }, 500);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    onSearch({ query, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-lg bg-white p-2 shadow"
    >
      <label htmlFor="merchant-search" className="sr-only">
        {t('searchLabel')}
      </label>
      <span aria-hidden="true">
        <SearchGlass />
      </span>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t('searchLabel')}
        className="flex-1 bg-transparent outline-none"
      />

      <label htmlFor="merchant-sort" className="sr-only">
        {t('sortLabel')}
      </label>
      <select
        value={sort}
        onChange={e =>
          setSort(e.target.value as MerchantListRequestParams['sort'])
        }
        className="w-auto appearance-none rounded border border-gray-100 bg-gray-100 px-2 py-1 text-center text-sm"
        aria-label="Sort merchants"
      >
        <option value="name">{t('name')}</option>
        <option value="category">{t('category')}</option>
        <option value="distanceKm">{t('distance')}</option>
        <option value="rating">{t('rating')}</option>
      </select>
    </form>
  );
}
