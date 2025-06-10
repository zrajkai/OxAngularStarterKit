import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs/internal/Observable";
import { Paginated, Base } from "../core/models/base.models";
import { environment } from "../../environments/environment";
import { ConfigService } from "./config.service";

@Injectable()
export class CrudService<T extends Paginated, I extends Base> {

    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);
    private apiUrl = computed(() => {
        return `${this.hostUrl}/${this.modelKey()}`;
    });

    protected readonly hostUrl = this.configService.getAPIUrl();
    modelKey = signal<string>('');
    keys = signal<string[]>(['id']);

    getAll(sortBy = 'id', sortDirection: SortDirection = 'desc', skip = 0, limit: number = environment.settings.table.pageSize): Observable<T> {
        return this.http.get<T>(`${this.apiUrl()}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortDirection}`);
    }

    getById(id: number): Observable<I> {
        return this.http.get<I>(`${this.apiUrl()}/${id}`);
    }

    create(recipe: I): Observable<I> {
        return this.http.post<I>(`${this.apiUrl()}/add`, recipe);
    }

    update(recipe: I): Observable<I> {
        return this.http.put<I>(`${this.apiUrl()}/${recipe.id}`, recipe);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl()}/${id}`);
    }
}