import React, {useCallback} from "react";
import {TaskType} from "./Todolist";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./component/UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";

export type TaskPropsType = {
    todolistID:string
    task: TaskType
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    updateTaskName: (todolistID: string, id: string, title: string) => void
}

export const Task = React.memo(({task,
                                    todolistID,
                                    removeTask,
                                    changeStatus,
                                    updateTaskName
                                }: TaskPropsType) => {
    console.log('task')
    const removeTaskHandler=useCallback(()=>{
        removeTask(task.id, todolistID)}, [removeTask, task.id])
    let onChangeTaskStatus = useCallback((newIsDone:boolean) => {
        // let newIsDone = e.currentTarget.checked
        changeStatus(task.id, newIsDone, todolistID)
    }, [changeStatus, task.id])
    let updateTaskNameHandlerMap=useCallback((title:string) =>{
         updateTaskName(todolistID, task.id, title)}, [updateTaskName, task.id])

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