import React, { FunctionComponent, useState } from 'react';
import { Field, FieldProps } from 'formik';
import { SimpleSelect } from 'react-selectize';

import { SelectOption } from 'form/ComboBox/SelectOption';
import If from 'core/Components/If';
import Icon from 'core/Components/Icon/Icon';

import 'react-selectize/themes/index.css';
import './ComboBox.module.scss';
import { Color } from '../../Color';


interface Props {
    name: string;
    options: SelectOption[];
    label: string;
    disabled?: boolean;
    value?: any;

    onChange?: (value?: SelectOption) => void;

    isForForm?: boolean;
    padBottom?: boolean;
    isSearch?: boolean;
    isForTable?: boolean;
}

const ComboBoxComponent = (props: Props & Partial<FieldProps>) => {

    const [placeholder, setPlaceholder] = useState(props.label);

    const onChange = (newOption?: SelectOption) => {
        props.form?.setFieldValue(props.name, newOption?.value);
        setTimeout(() => props.form?.setFieldTouched(props.name, true));

        if (props.onChange) {
            props.onChange(newOption);
        };
    };

    const value = props.isForForm ? props.field?.value : props.value;
    const foundValue = props.options.find(x => x.value === value);

    let fieldsetClassName = 'combo-box-fieldset ';
    if (props.meta && props.meta.touched && props.meta.error) {
        fieldsetClassName += 'combo-box-fieldsetError ';
    }
    if (props.padBottom) {
        fieldsetClassName += 'padBottom ';
    }
    if (props.isSearch) {
        fieldsetClassName += 'search ';
    }
    if (props.isForTable) {
        fieldsetClassName += 'forTable ';
    }
    if (props.label) {
        fieldsetClassName += 'hasLabel ';
    }

    let legendClassName = 'combo-box-legend ';
    if (!value) {
        legendClassName += 'combo-box-legendHasNoValue ';
    }

    const onOpenChange = (isOpen: boolean) => {
        if (isOpen && !value) {
            setPlaceholder('');
        } else {
            setPlaceholder(props.label);
        }
    };

    return (
        <fieldset className={fieldsetClassName}>
            <legend className={legendClassName}>{placeholder}</legend>
            <SimpleSelect
                options={props.options}
                value={foundValue}
                disabled={props.disabled}
                onValueChange={onChange}
                onOpenChange={onOpenChange}
                style={{ width: '100%' }}
                name={props.name}
                hideResetButton={props.isForTable}
            />
            <If show={!!props.isSearch}>
                <div className="combo-box-search-icon">
                    <Icon name="search" size="2x" color={Color.neutral_gray_6} />
                </div>
            </If>
            {
                props.meta && props.meta.touched && props.meta.error &&
                <div className="combo-box-error-message">{props.meta.error}</div>
            }
        </fieldset>
    );
};


const ComboBox: FunctionComponent<Props> = (props: Props) => {
    if (props.isForForm) {
        return (
            <Field name={props.name}>
                {(field: FieldProps) =>
                    <ComboBoxComponent {...props} {...field} />
                }
            </Field>
        );
    } else {
        return <ComboBoxComponent {...props} />;
    }
};


ComboBox.defaultProps = {
    isForForm: true,
    padBottom: true,
    disabled: false,
    isSearch: false,
    isForTable: false
};

export default ComboBox;