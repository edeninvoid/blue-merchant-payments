import { render, screen, fireEvent, act } from '@testing-library/react';
import MerchantListSearchBar from '@/components/merchants/list/MerchantListSearchBar';

describe('[UI] MerchantListSearchBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('query가 변경되면 500ms 후 onSearch가 호출된다', () => {
    const onSearchMock = jest.fn();
    render(<MerchantListSearchBar onSearch={onSearchMock} />);

    // 초기 마운트 시 호출된 onSearch는 무시한다.
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    onSearchMock.mockClear();

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: 'coffee' } });

    expect(onSearchMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onSearchMock).toHaveBeenCalledWith({
      query: 'coffee',
      sort: 'name',
    });
  });

  it('폼 제출 시 onSearch가 호출된다', () => {
    const onSearchMock = jest.fn();

    render(<MerchantListSearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'coffee' } });

    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledWith({
      query: 'coffee',
      sort: 'name',
    });
  });
});
