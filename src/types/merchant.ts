export interface MerchantListRequestParams {
  query?: string;
  sort?: 'name' | 'category' | 'rating' | 'distanceKm';
}

export type MerchantListItemInfo = {
  id: number;
  name: string;
  category: string;
  distanceKm: number;
  rating: number;
  logoUrl: string;
};

export type MerchantInfo = {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
};

export interface MerchantProductItemInfo {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
}

export interface MerchantProductItem extends MerchantProductItemInfo {
  isChecked: boolean;
}
