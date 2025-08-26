import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth';
import {
  handleAuthInterceptor,
  handleResponseError,
  handleResponseSuccess,
} from '@/lib/axios';

describe('[lib] axios', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    useAuthStore.setState({ token: null });
  });

  it('/auth/token 요청은 토큰 없으면 통과하여 반환한다.', async () => {
    const config = {
      url: '/auth/token',
      headers: {},
    } as InternalAxiosRequestConfig;
    const result = await handleAuthInterceptor(config);
    expect(result).toBe(config);
  });

  it('토큰이 없으면 401 에러를 반환한다.', async () => {
    const config = { url: '/test', headers: {} } as InternalAxiosRequestConfig;
    await expect(handleAuthInterceptor(config)).rejects.toMatchObject({
      response: { status: 401 },
    });
  });

  it('토큰이 있으면 Authorization 헤더를 추가한다', async () => {
    useAuthStore.setState({
      token: { token: 'mock-token', expireDate: new Date(Date.now() + 1000) },
    });

    const config = { url: '/test', headers: {} } as InternalAxiosRequestConfig;
    const result = await handleAuthInterceptor(config);

    expect(result.headers!.Authorization).toBe('Bearer mock-token');
  });

  it('성공 응답은 data 객체를 반환한다.', () => {
    const response = {
      data: { test: 'test' },
    } as AxiosResponse<{ test: string }>;

    const result = handleResponseSuccess(response);
    expect(result).toEqual({ test: 'test' });
  });

  it('401 에러 응답은 빈 배열을 반환한다.', () => {
    const error = {
      response: { status: 401 },
    } as AxiosError;

    const result = handleResponseError(error);
    expect(result).toEqual([]);
  });

  it('401 이외의 에러는 reject 된다.', async () => {
    const error = {
      response: { status: 500 },
    } as AxiosError;

    await expect(handleResponseError(error)).rejects.toMatchObject({
      response: { status: 500 },
    });
  });
});
