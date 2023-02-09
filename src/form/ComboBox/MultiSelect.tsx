import React, { FunctionComponent } from 'react';
import { FieldArray, Field, FieldProps, FieldArrayRenderProps } from 'formik';
import { MultiSelect as SelectizeMultiSelect } from 'react-selectize';


import { SelectOption } from 'form/ComboBox/SelectOption';


import 'react-selectize/themes/index.css';
import './MultiSelect.module.scss';


interface Props {
    name: string;
    options: SelectOption[];
    label: string;
    disabled?: boolean;

    onChange?: (values: SelectOption[]) => void;
}

const MultiSelect: FunctionComponent<Props> = (props: Props) => {
    return (
        <FieldArray name={props.name}>
            {(arrayHelpers: FieldArrayRenderProps) => {
                const onChange = (values: SelectOption[]) => {
                    arrayHelpers.form.setFieldValue(props.name, values.map(v => v.value));
                    arrayHelpers.form.setFieldTouched(props.name, true, true);

                    if (props.onChange) {
                        props.onChange(values);
                    };
                };

                const internalValue = props.options.filter(o => arrayHelpers.form.values[props.name].find((v: SelectOption[]) => v === o.value));

                const meta = arrayHelpers.form.getFieldMeta(props.name);

                let fieldsetClassName = 'multi-select-fieldset ';
                if (meta.touched && meta.error) {
                    fieldsetClassName += 'multi-select-fieldsetError ';
                }

                let legendClassName = 'multi-select-legend ';
                // @ts-ignore
                if (!meta.value || !meta.value.length) {
                    legendClassName += 'multi-select-legendHasNoValue ';
                }

                return (
                    <fieldset className={fieldsetClassName}>
                        <legend className={legendClassName}>{props.label}</legend>
                        <SelectizeMultiSelect
                            options={props.options}
                            values={internalValue}
                            placeholder={props.label}
                            disabled={props.disabled === true}
                            //@ts-ignore  The type is wrong
                            onValuesChange={onChange}
                            style={{ width: '100%' }}
                        />
                        <Field name={props.name} style={{ position: 'relative' }}>
                            {(field: FieldProps) => {
                                if (field.meta.touched && field.meta.error) {
                                    return <div className="multi-select-error-message">{field.meta.error}</div>;
                                }
                                return null;
                            }}
                        </Field>
                    </fieldset>
                );
            }}
        </FieldArray>
    );

};


export default MultiSelect;