import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PostOrderRequestParams, PostOrderResponse } from '@/types/orders';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function replaceRatingToStar(rating: number) {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
}

export function formattedPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getPushUrl(
  locale: string,
  orderParams: PostOrderRequestParams,
  orderRes: PostOrderResponse,
) {
  return `/${locale}/order/${orderRes.status.toLowerCase()}?merchantId=${orderParams.merchantId}&currency=${orderParams.currency}&amount=${orderParams.amount}&orderId=${orderRes.orderId}`;
}
