import {
  cn,
  delay,
  replaceRatingToStar,
  formattedPrice,
  getPushUrl,
} from '@/lib/utils';
import { EXCHANGE_RATES } from '@/lib/constants';

describe('[lib] utils', () => {
  describe('cn', () => {
    it('clsx + tailwind-merge 정상 동작', () => {
      const result = cn('p-2', 'text-center', 'p-4');
      // tailwind-merge 로 중복 p-2, p-4 병합 -> p-4가 남음
      expect(result).toContain('p-4');
      expect(result).toContain('text-center');
    });
  });

  describe('delay', () => {
    it('지정된 시간 후에 resolve 된다', async () => {
      const start = Date.now();
      await delay(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(48);
    });
  });

  describe('replaceRatingToStar', () => {
    it('정수 평점을 반올림하여 ★로 변환한다.', () => {
      expect(replaceRatingToStar(0)).toBe('☆☆☆☆☆');
      expect(replaceRatingToStar(2.6)).toBe('★★★☆☆');
      expect(replaceRatingToStar(3)).toBe('★★★☆☆');
      expect(replaceRatingToStar(4.2)).toBe('★★★★☆');
      expect(replaceRatingToStar(5)).toBe('★★★★★');
    });
  });

  describe('formattedPrice', () => {
    it('locale이 KRW면 소수점 없이 표시한다.', () => {
      const price = 100;
      expect(formattedPrice(price, 'ko')).toBe(
        new Intl.NumberFormat('ko', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price * EXCHANGE_RATES['ko'].rate),
      );
    });

    it('locale이 USD면 소수점 2자리까지 표시한다.', () => {
      const price = 10;
      expect(formattedPrice(price, 'en')).toBe(
        new Intl.NumberFormat('en', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price * EXCHANGE_RATES['en'].rate),
      );
    });
  });

  describe('getPushUrl', () => {
    it('올바른 URL을 생성한다', () => {
      const locale = 'en';
      const orderParams = {
        merchantId: 'm123',
        currency: 'USD',
        amount: '100',
      } as const;
      const orderRes = { status: 'PAID', orderId: 'o123' } as const;

      const url = getPushUrl(locale, orderParams, orderRes);
      expect(url).toBe(
        `/en/order/paid?merchantId=m123&currency=USD&amount=100&orderId=o123`,
      );
    });
  });
});
