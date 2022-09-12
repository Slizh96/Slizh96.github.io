import React, {useCallback} from "react";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./component/UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    todolistID: string,
    taskID: string,

}

export const TaskRedux = React.memo(({
                                         todolistID,
                                         taskID,

                                     }: TaskPropsType) => {
    console.log('task')
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID]
        .filter(t=>t.id===taskID)[0])

    const dispatch = useDispatch()

    const removeTaskHandlerRed = useCallback(() => {
        dispatch(removeTaskAC(taskID, todolistID))
    }, [dispatch])

    const onChangeTaskStatusRed = useCallback((isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }, [dispatch])

    const updateTaskNameHandlerMapRed = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    }, [dispatch])

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <IconButton
            onClick={removeTaskHandlerRed}>
            <Delete/>
        </IconButton>
        <UniversalCheckBox
            isDone={task.isDone}
            callBack={onChangeTaskStatusRed}/>
        <EditableSpan title={task.title}
                      onChange={updateTaskNameHandlerMapRed}/>
    </div>
})