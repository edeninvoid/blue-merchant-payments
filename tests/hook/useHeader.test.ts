import { renderHook } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useHeader } from '@/lib/hooks/useHeader';

describe('[hook] useHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('router.back 함수가 useHeader 훅에 포함되어 있다', () => {
    const { result } = renderHook(() => useHeader());

    expect(typeof result.current.router.back).toBe('function');
  });

  it('locale 경로로 끝나면 isRootPath는 true이다.', () => {
    (usePathname as jest.Mock).mockReturnValue('/en');

    const { result } = renderHook(() => useHeader());

    expect(result.current.conditionalPath.isRootPath).toBe(true);
    expect(result.current.conditionalPath.isOrderPath).toBe(false);
  });

  it('order 경로를 포함하면 isOrderPath는 true이다', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/order/1');

    const { result } = renderHook(() => useHeader());

    expect(result.current.conditionalPath.isOrderPath).toBe(true);
    expect(result.current.conditionalPath.isRootPath).toBe(false);
  });
});
