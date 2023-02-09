import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Field, FieldProps } from 'formik';

import classes from './Input.module.scss';
import If from 'core/Components/If';
import { Color } from '../../Color';
import Icon from 'core/Components/Icon/Icon';
import { CurrencyService } from 'core/Services/CurrencyService';


interface Props extends PropsWithChildren<{}> {
    type?: 'text' | 'password' | 'number' | 'currency';
    label?: string;
    value?: string;
    name: string;
    disabled?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

    isForForm?: boolean;
    padBottom?: boolean;
    isForTable?: boolean;
    isSearch?: boolean;
}

let debounce: any;

const InputComponent = (props: Props & Partial<FieldProps>) => {

    const value = props.isForForm ? props.meta?.value : props.value;


    const className = classes.input + ' ';

    let fieldsetClassName = classes.fieldset + ' ';
    if (props.meta && props.meta.touched && props.meta.error) {
        fieldsetClassName += classes.fieldsetError + ' ';
    }
    if (props.padBottom) {
        fieldsetClassName += classes.padBottom + ' ';
    }
    if (props.isForTable) {
        fieldsetClassName += classes.isForTable + ' ';
    }
    if (props.isSearch) {
        fieldsetClassName += classes.isSearch + ' ';
    }
    if (props.isSearch) {
        fieldsetClassName += classes.isSearch + ' ';
    }
    if (props.type === 'currency') {
        fieldsetClassName += classes.isCurrency + ' ';
    }
    if (props.disabled) {
        fieldsetClassName += classes.isDisabled + ' ';
    }

    let legendClassName = classes.legend + ' ';
    if (value === undefined || value === null || value === '') {
        legendClassName += classes.legendHasNoValue + ' ';
    }


    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.field) {
            props.field.onChange(event);
            setTimeout(() => {
                props.form?.setFieldTouched(props.name, true, true);
            });
        }
        if (props.onChange) {
            props.onChange(event);
        }


        if (props.type === 'currency') {
            if (debounce) {
                clearTimeout(debounce);
            }
            debounce = setTimeout(() => {
                event.target.value = CurrencyService.format(event.target.value)!;
                if (props.field) {
                    props.field.onChange(event);
                }
                if (props.onChange) {
                    props.onChange(event);
                }
            }, 500);
        }
    };


    let label = props.label;
    if (props.isSearch && value) {
        label = '';
    }


    return (
        <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>{label}</legend>
            <If show={props.type === 'currency'}>
                <div className={classes.currency}>$</div>
            </If>
            <input
                {...props.field}
                onChange={onChange}
                onBlur={props.onBlur}
                disabled={props.disabled}
                type={props.type}
                name={props.name}
                defaultValue={props.value}
                className={className}>{props.children}</input>
            <If show={!!props.isSearch}>
                <div className={classes.searchIcon}>
                    <Icon name="search" size="2x" color={Color.neutral_gray_6} />
                </div>
            </If>
            {
                props.meta && props.meta.touched && props.meta.error &&
                <div className={classes.inputError}>{props.meta.error}</div>
            }
        </fieldset>
    );
};


const Input: FunctionComponent<Props> = (props: Props) => {
    if (props.isForForm) {
        return (
            <Field name={props.name}>
                {(field: FieldProps) =>
                    <InputComponent {...props} {...field} />
                }
            </Field>
        );
    } else {
        return <InputComponent {...props} />;
    }
};


Input.defaultProps = {
    type: 'text',
    isForForm: true,
    padBottom: true,
    disabled: false,
    isForTable: false,
    isSearch: false
};

export default Input;
