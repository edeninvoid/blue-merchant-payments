import { act } from '@testing-library/react';
import { useAuthStore } from '@/store/auth';

const mockToken = { token: 'mock-token', expireDate: new Date() };

describe('[store] auth', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null });
  });

  it('AuthTokenStore의 초기 상태는 Null이다.', () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
  });

  it('AuthTokenStore의 setToken 함수를 통해 토큰을 저장할 수 있다.', () => {
    act(() => {
      useAuthStore.getState().setToken(mockToken);
    });

    const state = useAuthStore.getState();
    expect(state.token).toEqual(mockToken);
  });

  it('AuthTokenStore의 clearToken 함수를 통해 토큰을 초기화할 수 있다.', () => {
    act(() => {
      useAuthStore.getState().setToken(mockToken);
    });

    act(() => {
      useAuthStore.getState().clearToken();
    });

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
  });
});
