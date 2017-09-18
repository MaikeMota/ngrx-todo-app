import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodoPayload, TodoActions, ActionWithPayLoad } from './../reducers/todo.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos$: Observable<any>;
  todo: string;
  editing = false;
  indexToEdit: number | null;

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    this.todos$ = this.store.select('todoReducer');
  }

  addTodo(value) {
    this.store.dispatch({
      type: TodoActions.ADD, payload: { value, done: false }
    });
    this.todo = '';
  }

  deleteTodo(index) {
    this.store.dispatch({
      type: TodoActions.DELETE, payload: { index }
    });
  }

  editTodo(todo, index) {
    this.editing = true;
    this.todo = todo.value;
    this.indexToEdit = index;
  }

  cancelEdit() {
    this.editing = false;
    this.todo = '';
    this.indexToEdit = null;
  }

  updateTodo(updatedTodo) {
    this.store.dispatch({
      type: TodoActions.UPDATE, payload: { index: this.indexToEdit, newValue: updatedTodo }
    });
    this.todo = '';
    this.indexToEdit = null;
    this.editing = false;
  }

  toggleDone(todo, index) {
    this.store.dispatch({ type: TodoActions.TOOGLE, payload: { index, done: todo.done } });
  }

}
