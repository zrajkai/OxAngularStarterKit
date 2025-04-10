import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable, tap } from "rxjs";
import { Task, Tasks } from "../app/core/fake-api/db.data";
import { ConfigService } from "./config.service";

const PAGE_SIZE = 25;

@Injectable()
export class TaskService {
    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);

    private readonly hostUrl = this.configService.getAPIUrl();


    getTasks(sortBy: string, sortDirection: SortDirection, pageIndex: number): Observable<Tasks> {
        return this.http.get<Tasks>(`${this.hostUrl}/tasks?sortBy=${sortBy}&sortDirection=${sortDirection}&pageIndex=${pageIndex}`)
            .pipe(
                tap((response) => {
                    let pagedItems = [];
                    if (response?.items?.length > PAGE_SIZE) {
                        pagedItems = response.items.slice(0 * (pageIndex * PAGE_SIZE), PAGE_SIZE);
                    }
                    else {
                        pagedItems = response.items;
                    }
                    response.items = pagedItems;
                    return response;
                })
            );
    }

    addTask(task: Omit<Task, "id">): Promise<Task> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...task, id: Math.random() });
            }, 1000);
        });
    }
}