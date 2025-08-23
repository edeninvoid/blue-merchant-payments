import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MerchantListRequestParams } from '@/types/merchant';
import SearchGlass from '@/components/_icons/SearchGlass';

export default function MerchantListSearchBar({
  onSearch,
}: {
  onSearch: Dispatch<SetStateAction<MerchantListRequestParams | undefined>>;
}) {
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
        Search merchants
      </label>
      <span aria-hidden="true">
        <SearchGlass />
      </span>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search merchants"
        className="flex-1 bg-transparent outline-none"
      />

      <label htmlFor="merchant-sort" className="sr-only">
        Sort merchants
      </label>
      <select
        value={sort}
        onChange={e =>
          setSort(e.target.value as MerchantListRequestParams['sort'])
        }
        className="w-auto appearance-none rounded border border-gray-100 bg-gray-100 px-1 py-1 text-center text-sm"
        aria-label="Sort merchants"
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="distanceKm">Distance</option>
        <option value="rating">Rating</option>
      </select>
    </form>
  );
}
