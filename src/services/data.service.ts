import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Data {
    id: number;
    name: string;
    details: string;
}

@Injectable()
export class DataService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

    constructor(private http: HttpClient) { }

    fetchData(page: number, limit: number): Observable<Data[]> {
        return this.http.get<Data[]>(`${this.apiUrl}?_page=${page}&_limit=${limit}`);
    }
}