import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {
    AddTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolistReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";


export type FiltrType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string,
    title: string,
    filter: FiltrType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'All'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'All'
        },
    ])

    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'React22', isDone: true},
            {id: v1(), title: 'Redux22', isDone: false},
        ],
    })
    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTask(action)

    }
    const removeTask = (id: string, todolistID: string) => {
        dispatchToTask(removeTaskAC(id, todolistID))
    }
    const changeFilter = (todolistID: string, value: FiltrType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, value))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatchToTask(addTaskAC(title, todolistID))
    }
    const addTodolist = (title: string) => {
        let action=AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTask(action)
    }
    const updateTaskName = (todolistID: string, id: string, title: string) => {
        dispatchToTask(changeTaskTitleAC(todolistID, id, title))
    }
    const updateTodolistName = (todolistID: string, title: string) => {
        dispatchToTodolists(changeTodolistAC(todolistID, title))
    }
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatchToTask(changeTaskStatusAC(id, isDone, todolistID))
    }
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addTask={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let filtredTask = tasks[tl.id]
                            if (tl.filter === 'Active') {
                                filtredTask = filtredTask.filter(f => !f.isDone)
                            }
                            if (tl.filter === 'Completed') {
                                filtredTask = filtredTask.filter(f => f.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={filtredTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTaskName={updateTaskName}
                                        updateTodolistName={updateTodolistName}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
