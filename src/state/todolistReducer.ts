import React from "react";
import {FiltrType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistACType | changeTodolistFilterACType

const initialState: TodolistType[]=[]
export const todolistsReducer = (state = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state].filter(t => t.id !== action.payload.id);
            break;
        case 'ADD-TODOLIST':
            let newTod:TodolistType = {id: action.payload.todolistID, title: action.payload.title, filter: "All"}
            return [...state, newTod];
            break;
        case 'CHANGE-TODOLIST-TITLE':
            return [...state].map(f => f.id === action.payload.id ? {...f, title: action.payload.title} : f)
            break;
        case 'CHANGE-TODOLIST-FILTER':
            return [...state].map(f => f.id === action.payload.id ? {...f, filter: action.payload.filter} : f)
            break;
        default:
            return state
    }
}

export  type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
};
export type addTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string ) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistID: v1()
        }
    } as const
};
type changeTodolistACType = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
};
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FiltrType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
};
