import { TodoDTO } from "./todos/models/todo.dto";
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './todos/reducers';

// export interface AppState {
//     todos: TodoDTO[];
//     loading: boolean;
//     loaded: boolean;
//     error: any;
// }

export interface AppState {
    todosApp: reducers.TodoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    todosApp: reducers.todoReducer
};