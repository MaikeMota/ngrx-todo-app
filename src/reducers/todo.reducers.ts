import { Action } from '@ngrx/store';



export class TodoActions {
    static readonly ADD = 'ADD_TODO';
    static readonly DELETE = 'DELETE_TODO';
    static readonly UPDATE = 'UPDATE_TODO';
    static readonly TOOGLE = 'TOOGLE_TODO';
}

export interface ActionWithPayLoad<T> extends Action {
    payload: T;
}

export interface TodoPayload {
    index?: number;
    done?: boolean;
    value?: string;
    newValue: string;
}

export function todoReducer(state = [], action: ActionWithPayLoad<TodoPayload>) {
    switch (action.type) {
        case TodoActions.ADD: {
            return [action.payload, ...state];
        }
        case TodoActions.DELETE: {
            return state.filter((item, index) => {
                index !== action.payload.index;
            });
        }
        case TodoActions.UPDATE: {
            return state.map((item, index) => {
                return index === action.payload.index ? Object.assign({}, item, { value: action.payload.newValue }) : item;
            });
        }
        case TodoActions.TOOGLE: {
            return state.map((item, index) => {
                return index === action.payload.index ? Object.assign({}, item, { done: !action.payload.done }): item;
            });
        }
        default: {
            return state;
        }
    }
}