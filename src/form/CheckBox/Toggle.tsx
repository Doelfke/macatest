import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';


import classes from './Toggle.module.scss';
import If from 'core/Components/If';


interface Props {
    name: string;
    label: string;
    secondaryLabel?: string;
    offLabel?: string;
    disabled?: boolean;
    value?: boolean;
    isForForm?: boolean;
    padBottom?: boolean;

    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}


const ToggleComponent: FunctionComponent<Props> = (props: Props & Partial<FieldProps>) => {
    const value = props.isForForm ? props.field!.value : props.value;

    const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (props.isForForm) {
            props.form!.setFieldValue(props.name, !value);
            setTimeout(() => props.form?.setFieldTouched(props.name, true));
        }

        if (props.onClick) {
            props.onClick(e);
        }
    };

    let label = props.label;
    if (props.offLabel && !value) {
        label = props.offLabel;
    }

    let checkboxClass = classes.checkbox + ' ';
    if (props.padBottom) {
        checkboxClass += classes.padBottom + ' ';
    }

    let ovalClass = classes.oval + ' ';
    if (value) {
        ovalClass += classes.ovalOn + ' ';
    }

    let circleClass = classes.circle + ' ';
    if (value) {
        circleClass += classes.circleOn + ' ';
    }

    return (
        <div className={checkboxClass}>
            <div className={classes.labelContainer}>
                {label}
                <If show={!!props.secondaryLabel}>
                    <div className={classes.secondaryLabelContainer}>
                        {props.secondaryLabel}
                    </div>
                </If>
            </div>


            <div className={classes.checkboxContainer}>
                <label htmlFor={'checkbox' + props.name}>
                    <div className={ovalClass}>
                        <div className={circleClass}>
                            <input
                                id={'checkbox' + props.name}
                                name={props.name}
                                type="checkbox"
                                defaultChecked={!!value}
                                disabled={props.disabled === true}
                                onClick={onClick}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};


const Toggle: FunctionComponent<Props> = (props: Props) => {
    if (props.isForForm) {
        return (
            <Field name={props.name}>
                {(field: FieldProps) =>
                    <ToggleComponent {...props} {...field} />
                }
            </Field>
        );
    } else {
        return <ToggleComponent {...props} />;
    }
};


Toggle.defaultProps = {
    isForForm: true,
    padBottom: true
};

export default Toggle;