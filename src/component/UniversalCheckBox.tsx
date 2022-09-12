import React, {ChangeEvent} from "react";
import {Checkbox} from "@material-ui/core";

type CheckBoxPropsType ={
    isDone: boolean,
    callBack:(isDone:boolean)=>void
}

export const UniversalCheckBox =(props:CheckBoxPropsType)=>{
    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return(

    <Checkbox
        checked={props.isDone}
        onChange={onChangeTaskStatus}
        color='secondary'
    />

    )
}