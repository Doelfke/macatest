import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useField } from 'formik';


import classes from './TextArea.module.scss';


interface Props extends PropsWithChildren<{}> {
    label?: string;
    value?: string;
    name: string;
    disabled?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}


const TextArea: FunctionComponent<Props> = (props: Props) => {
    const [field, meta] = useField(props);

    const isDisabled = props.disabled === true;

    const className = classes.input + ' ';

    let fieldsetClassName = classes.fieldset + ' ';
    if (meta.touched && meta.error) {
        fieldsetClassName += classes.fieldsetError + ' ';
    }

    let legendClassName = classes.legend + ' ';
    if (meta.value === undefined || meta.value === null || meta.value === '') {
        legendClassName += classes.legendHasNoValue + ' ';
    }

    let rows = meta.value.split('\n').length;
    if (rows < 3) {
        rows = 3;
    }

    return (
        <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>{props.label}</legend>
            <textarea
                rows={rows}
                onChange={props.onChange}
                onBlur={props.onBlur}
                disabled={isDisabled}
                name={props.name}
                value={props.value}
                {...field}
                className={className}>{props.children}</textarea>
            {
                meta.touched && meta.error &&
                <div className={classes.inputError}>{meta.error}</div>
            }
        </fieldset>
    );
};


export default TextArea;
