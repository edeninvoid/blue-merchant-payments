import { http, HttpResponse } from 'msw';

function generateBase64Token(bytes = 24) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export const authHandlers = [
  http.post('/api/auth/token', async ({ request }) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      token: generateBase64Token(),
      expiresIn: 60 * 60 * 24 * 7,
    });
  }),
];
