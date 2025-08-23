import { http, HttpResponse } from 'msw';

function generateBase64Token(bytes = 24) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export const authHandlers = [
  http.post('/api/auth/token', async () => {
    // { request } 에 따른 body 확인 및 분기 처리 데이터 but 필요한 데이터가 아니기에 주석처리
    // const body = await request.json();

    return HttpResponse.json({
      token: generateBase64Token(),
      expiresIn: 60 * 60 * 24 * 7,
    });
  }),
];
