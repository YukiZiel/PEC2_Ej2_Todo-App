import { createReducer, on, Action } from '@ngrx/store';
import { TodoDTO } from '../models/todo.dto';
import { createTodo, completeTodo, editTodo, deleteTodo, getAllTodos, getAllTodosSuccess, getAllTodosError, completeAllTodos, deleteCompletedTodos } from '../actions';
import { AppState } from 'src/app/app.reducer';

// export const initialState: TodoDTO[] = [new TodoDTO('Terminar práctica 2')];

export interface TodoState {
    todos: TodoDTO[];
    loading: boolean;
    loaded: boolean;
    error:any;
}

export const initialState: TodoState = {
    todos: [new TodoDTO('Terminar práctica 2')],
    loading: false,
    loaded: false,
    error: null
};

const _todoReducer = createReducer(
    initialState,
    // on(createTodo, (state, { title }) => [...state, new TodoDTO(title)]),
    on(createTodo, (state, {title}) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [...state.todos, new TodoDTO(title)]
    })),
    // on(completeTodo, (state, { id }) => {
    //     return state.map((todo) => {
    //         if (todo.id === id) {
    //             return {
    //                 ...todo,
    //                 done: true,
    //             };
    //         } else {
    //             return todo;
    //         }
    //     })
    // }),
    on(completeTodo, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [...state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    done: true,
                };
            } else {
                return todo;
            }
        })]

    })),

//     on(editTodo, (state, { id, title }) => {
//         return state.map((todo) => {
//             if (todo.id === id) {
//                 return {
//                     ...todo,
//                     title: title,
//                 };
//             } else {
//                 return todo;
//             }
//         })
//     }),

    on(editTodo, (state, { id, title }) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [...state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                };
            } else {
                return todo;
            }
        })]
    })),

//     on(deleteTodo, (state, { id }) => state.filter(todo => todo.id !== id))
    on(deleteTodo, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [...state.todos.filter( todo => todo.id !== id)]
    })),

    on(getAllTodos, state => ({...state, loading:true})),
    on(getAllTodosSuccess, (state, {todos}) => ({
        ...state,
        loading: false,
        loaded: true,
        todos: state.todos.slice()
    })),

    on(getAllTodosError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),
    
    on(completeAllTodos, state => ({
        ...state, 
        loading: false,
        loaded: false,
        todos: [...state.todos.map(todo => ({ ...todo, done: true}))]
    })),

    on(deleteCompletedTodos, state => ({
        ...state, 
        loading: false,
        loaded:false,
        todos: [...state.todos.filter(todo => !todo.done)]
    }))

);

export function todoReducer(state: TodoState | undefined, action: Action) {
    return _todoReducer(state, action);
}