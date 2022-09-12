import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemType = {
    addTask: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemType) => {
    // console.log('addItemForm')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let addTaskT = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTaskT()
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={(onKeyPressHandler)}
                       size='small'
                       error={!!error}
                       label='Title'
                       helperText={error}
            />
            <IconButton
                color='secondary'
                onClick={addTaskT}
                size='small'
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})