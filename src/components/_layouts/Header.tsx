'use client';

import ArrowLeft from '@/components/_icons/ArrowLeft';
import clsx from 'clsx';
import { useHeader } from '@/lib/hooks/useHeader';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import { useHeaderTitleStore } from '@/store/common';

export default function Header() {
  const {
    router: { back },
    conditionalPath: { isRootPath, isOrderPath },
    selectProps: { currentLang, handleChange },
  } = useHeader();
  const title = useHeaderTitleStore(state => state.title);

  return (
    <header
      className={clsx(
        'sticky top-0 flex h-12 items-center gap-4 bg-neutral-300/90 p-4',
        isOrderPath && 'hidden',
      )}
    >
      <button
        type="button"
        title="Go back"
        aria-label="Go back"
        className={clsx('', isRootPath && 'hidden')}
        onClick={back}
      >
        <ArrowLeft />
      </button>
      <h1 className="text-lg">{title}</h1>
      <nav
        aria-label="Language selector"
        className={clsx('ml-auto', isOrderPath && 'hidden')}
      >
        <label htmlFor="locale-select" className="sr-only">
          Select Language
        </label>
        <select
          id="locale-select"
          value={currentLang}
          onChange={handleChange}
          className="rounded border border-gray-400 p-1 text-sm"
        >
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </nav>
    </header>
  );
}
