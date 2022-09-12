import React, {useCallback} from "react";
import {TaskType} from "./Todolist";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./component/UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";

export type TaskPropsType = {
    todolistID:string
    taskID: string
    // removeTask: (id: string, todolistID: string) => void
    // changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    // updateTaskName: (todolistID: string, id: string, title: string) => void
}

export const Task1 = React.memo(({taskID,
                                    todolistID,
                                    // removeTask,
                                    // changeStatus,
                                    // updateTaskName
                                }: TaskPropsType) => {
    console.log('task')

    const task = useSelector<AppRootStateType, TaskType>(state=>state.tasks[todolistID]
        .filter(task=>task.id ===taskID)[0])
    const dispatch = useDispatch()

    const removeTaskHandler=useCallback(()=>{
        dispatch(removeTaskAC(taskID, todolistID))}, [dispatch,taskID, todolistID])

    let onChangeTaskStatus = useCallback((newIsDone:boolean) => {
        // let newIsDone = e.currentTarget.checked
       dispatch( changeTaskStatusAC(taskID, newIsDone, todolistID))
    }, [dispatch, task.id, todolistID])
    let updateTaskNameHandlerMap=useCallback((title:string) =>{
         dispatch(changeTaskTitleAC(todolistID, taskID, title))}, [dispatch, taskID, todolistID])

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <IconButton
            onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
        <UniversalCheckBox
            isDone={task.isDone}
            callBack={onChangeTaskStatus}/>
        <EditableSpan title={task.title}
                      onChange={updateTaskNameHandlerMap}/>
    </div>
})