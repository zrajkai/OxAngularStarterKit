import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../core/fake-api/db.data';

@Component({
    selector: 'hg-feature-one',
    imports: [],
    providers: [TaskService],
    templateUrl: './feature-one.component.html',
    styles: ``
})
export class FeatureOneComponent implements OnInit {

    taskService = inject(TaskService);

    tasks = signal<Task[]>([]);

    ngOnInit() {
        this.taskService.getTasks()
            .pipe(take(1))
            .subscribe((tasks) => {
                this.tasks.set(tasks);
            });
    }


}
