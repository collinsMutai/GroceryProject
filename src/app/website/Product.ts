export interface Product {
  productName: string;
  productImage: string;
  productPrice: number;
  productDiscountPrice: number;
  productDescription: string;
  productCategory: string;
  id: string;
  featuredProduct: true;
}
export interface Item {
  id: string;
  name: string;
  imageUrl: string;
  unitPrice500g?: number;
  unitPriceKg?: number;
  description: string;
  category: string;
  inStock: boolean;
}

