import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string,
    onChange: (title: string) => void,
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [edit, setEdid] = useState(false)
    let [title, setTitle] = useState(props.title)
    const onDoubleClickHandler = () => {
        setEdid(true)

    }

    const onBlurHandler = () => {
        setEdid(false)
        props.onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>{
            edit
                ? <TextField
                    variant='outlined'
                    value={title}
                    onChange={changeTitle}
                    autoFocus
                    onBlur={onBlurHandler}
                    size='small'
                />
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        }
        </>
    )
})