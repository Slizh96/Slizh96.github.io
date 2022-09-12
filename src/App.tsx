import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

export type FiltrType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string,
    title: string,
    filter: FiltrType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<TodolistType[]>([
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

    let [tasks, setTask] = useState<TaskStateType>({
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
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
        setTask({...tasks})
    }
    const removeTask = (id: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        setTask({...tasks})
    }
    const changeFilter = (todolistID: string, value: FiltrType) => {
        let todolist = todolists.find(t => t.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistID: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTask({...tasks})
    }
    const addTodolist = (title: string) => {
        let newId = v1()
        let newTod: TodolistType = {id: newId, title: title, filter: 'All'};
        setTodolists([newTod, ...todolists])
        setTask({
            ...tasks,
            [newId]: []
        })
    }
    const updateTaskName = (todolistID: string, id: string, title: string) => {
        setTask({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, title} : t)})
    }
    const updateTodolistName = (todolistID: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t))
    }
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        let task = tasks[todolistID].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTask({...tasks})
        }
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
                <Grid container style={{padding:'20px'}}>
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
                        <Paper style={{padding:'10px'}}>
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

export default App;
