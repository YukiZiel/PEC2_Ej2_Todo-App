import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getAllTodos, getAllTodosError, getAllTodosSuccess } from "../actions";
import { TodoService } from "../services/todo.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { TodoDTO } from "../models/todo.dto";

@Injectable()
export class TodosEffects {
    constructor(
        private actions$: Actions,
        private todosService: TodoService
    ) {}

    getTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllTodos),
            mergeMap(() =>
                this.todosService.getAllTodos().pipe(
                    map((todos:TodoDTO[]) => getAllTodosSuccess({ todos: todos})),
                    catchError((err: Error) => of(getAllTodosError({ payload:err })))
                )
            )
        )
    );
}