import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs/internal/Observable";
import { Paginated, Base } from "../app/core/models/base.models";
import { environment } from "../environments/environment";
import { ConfigService } from "./config.service";

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

export const productKeys: (keyof ProductDTO)[] = ['id', 'title', 'description', 'category', 'price', 'discountPercentage', 'rating', 'stock'];

@Injectable()
export class ProductService {
    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);

    private readonly hostUrl = this.configService.getAPIUrl();

    getProducts(sortBy = 'id', sortDirection: SortDirection = 'desc', skip = 0, limit: number = environment.settings.table.pageSize): Observable<Products> {
        return this.http.get<Products>(`${this.hostUrl}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortDirection}`);
    }

}