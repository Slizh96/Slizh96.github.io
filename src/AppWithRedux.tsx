import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {AddTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC} from './state/todolistReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FiltrType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string,
    title: string,
    filter: FiltrType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))}, [dispatch])
            const removeTask =useCallback( (id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))}, [dispatch])
            const changeFilter = useCallback((todolistID: string, value: FiltrType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))}, [dispatch])
    const addTask = useCallback( (title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))}, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))}, [dispatch]);
    const updateTaskName = useCallback((todolistID: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, title))}, [dispatch])
    const updateTodolistName = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistAC(todolistID, title))}, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistID))}, [dispatch])
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

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
