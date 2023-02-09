import React, { FunctionComponent } from 'react';
import { useField } from 'formik';

import { SelectOption } from 'form/ComboBox/SelectOption';


import classes from './Checkboxes.module.scss';
import If from 'core/Components/If';

interface Props {
    name: string;
    disabled?: boolean;
    options: SelectOption[];
    title?: string;
    subTitle?: string;
}


const CheckBoxes: FunctionComponent<Props> = (props: Props) => {

    const [field, meta, helpers] = useField(props.name);

    const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const currentValues = field.value as any[];

        if (e.currentTarget.checked) {
            const newValues = currentValues.concat([e.currentTarget.value]);
            helpers.setValue(newValues);
            setTimeout(() => helpers.setTouched(true));

        } else {
            const newValues = currentValues.filter(x => x !== e.currentTarget.value);
            helpers.setValue(newValues);
            setTimeout(() => helpers.setTouched(true));
        }
    };

    const values = field.value as any[];

    return (
        <div className={classes.container}>
            <If show={!!props.title}>
                <div className={classes.title}>{props.title}</div>
                <If show={!!props.subTitle}>
                    <div className={classes.subTitle}>{props.subTitle}</div>
                </If>
            </If>
            {props.options.map((o, i) => {
                // eslint-disable-next-line
                const checked = values.some(x => x == o.value);
                let labelClass = classes.label + ' ';
                if (checked) {
                    labelClass += classes.labelChecked + ' ';
                }

                return (
                    <label htmlFor={'chk' + o.value} className={labelClass} key={i}>
                        {o.label}
                        <input
                            id={'chk' + o.value}
                            type="checkbox"
                            defaultChecked={checked}
                            value={o.value}
                            disabled={props.disabled === true}
                            onClick={onClick}
                            className={classes.input}
                        />
                    </label>

                );
            })}

            {
                meta.touched && meta.error &&
                <div style={{ color: 'red' }}>{meta.error}</div>
            }
        </div>
    );
};


export default CheckBoxes;