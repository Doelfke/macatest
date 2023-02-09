
import React from 'react';
import { Formik, Form as FormikForm, FormikHelpers, FormikErrors, FormikProps } from 'formik';


interface Props<T> {
    initialValues: T;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
    validate: (values: T) => void | object | Promise<FormikErrors<T>>;
    render: (props: FormikProps<T>) => React.ReactNode | React.ReactNode[];
}



const Form = <T extends any>(props: Props<T>) => {

    const render = (p: FormikProps<T>) => {
        return (
            <FormikForm>
                {props.render(p)}
            </FormikForm>
        );
    };


    const formatCurrency = (values: T) => {
        Object.keys(values || {}).forEach(k => {
            const value = values[k];
            if (typeof value === 'string' && !isNaN(parseFloat(value)) && value.includes('.') && value.split('.')[1].length === 2) {
                values[k] = parseFloat(value);
            }
            if (Array.isArray(value)) {
                value.forEach(x => formatCurrency(x));
            } else if (typeof value === 'object') {
                formatCurrency(value);
            }
        });

        return values;
    };

    const validate = (values: T) => {
        return props.validate(formatCurrency(values));
    };

    const onSubmit = (values: T, formikHelpers: FormikHelpers<T>) => {
        return props.onSubmit(formatCurrency(values), formikHelpers);
    };

    return (
        <Formik initialValues={props.initialValues} onSubmit={onSubmit} validate={validate} validateOnBlur={true} validateOnMount={true} >
            {(props) => render(props)}
        </Formik>
    );
};


export default Form;