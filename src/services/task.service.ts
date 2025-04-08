import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../app/core/fake-api/db.data";
import { ConfigService } from "./config.service";

@Injectable()
export class TaskService {
    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);

    private readonly hostUrl = this.configService.getAPIUrl();


    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.hostUrl}/tasks`);
    }

    addTask(task: Omit<Task, "id">): Promise<Task> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...task, id: Math.random() });
            }, 1000);
        });
    }
}