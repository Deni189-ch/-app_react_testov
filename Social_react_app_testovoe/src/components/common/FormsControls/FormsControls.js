import React from "react";
import css from './FormsControls.module.css'
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={css.formControl + ' ' + (hasError ? css.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

//Функция возвращает Field  с.к.
export const CreateField = (placeholder, name,  validate, component, props={}, text="") => (
    <div>
    <Field placeholder={placeholder}
           name={name}
           validate={validate}
           component={component}
           {...props}
    /> {text}
    </div>
)




