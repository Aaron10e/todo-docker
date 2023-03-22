import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from 'src/models/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit {
  public readonly items$ = new BehaviorSubject<TodoItem[]>([]);
  public itemDescription = new FormControl('');
  public title = 'Todo';

  constructor() {}  

  public ngOnInit(): void {
    this.items$.next([]);
  }

  public onKeydown(event: any) {
    if (event.key === "Enter") {
      this.createToDoItem();
    }
  }

  public createToDoItem() {
    if (!this.itemDescription?.value) return;
    const items = this.items$.value;
    let lastId = items.length ? items.reduce((item, curr) => {
      return item.id < curr.id ? curr : item;
    }).id : 0;
    const newItem = { id: lastId + 1, description: this.itemDescription?.value, done: false };
    const newItems = [...items, newItem];
    this.items$.next(newItems);
    this.itemDescription.setValue('');
  }

  public onClearItems(){
    this.items$.next([]);
    this.itemDescription.setValue('');
  }
}

