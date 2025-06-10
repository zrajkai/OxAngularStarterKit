import { Base, Paginated } from "./base.models";

export interface Products extends Paginated {
    products: ProductDTO[];
}

export interface ProductDTO extends Base {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
}

export const productKeys: (keyof ProductDTO)[] = [
    'id', 'title', 'description', 'category', 'price', 'discountPercentage'
];
