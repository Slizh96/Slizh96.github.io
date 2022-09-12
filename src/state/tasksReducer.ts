import React from "react";
import {FiltrType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {addTodolistACType, removeTodolistACType} from "./todolistReducer";

export type removeTaskACType = {
    type: 'REMOVE-TASK',
    payload: {
        id: string,
        todolistID: string
    }

}
export type addTaskACType = {
    type: 'ADD-TASK',
    payload: {
        title: string,
        id: string
    }
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        id: string,
        isDone: boolean,
        todolistID: string
    }
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id: string,
        todolistID: string,
        title: string
    }
}


type ActionType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType

const initialState: TaskStateType= {}

export const tasksReducer = (state=initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            };
        }
            break;
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.id]: [newTask, ...state[action.payload.id]]};
        }
            break;
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
            }
        }
            break;
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            };
        }
            break;
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todolistID]: []
            };
            break;
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
            break;
        }

        default:
            return state
    }
}

// type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTaskAC = (id: string, todolistID: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistID
        }
    } as const
};

// type changeTodolistACType = ReturnType<typeof changeTodolistAC>
export const addTaskAC = (title: string, id: string): addTaskACType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            id
        }

    } as const
};
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistID: string): changeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            isDone,
            todolistID
        }
    } as const
};
export const changeTaskTitleAC = (todolistID: string, id: string, title: string): changeTaskTitleACType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            id,
            title
        }
    } as const
};
// export const AddTodolistAC = (title: string): AddTodolistACType => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             title
//         }
//     } as const
// };
