import React, { FunctionComponent, PropsWithChildren } from 'react';

import classes from './FormSectionMaxWidth.module.scss';

interface Props extends PropsWithChildren<{}> {
}


const FormSectionMaxWidth: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={classes.maxWidth}>
            {props.children}
        </div>
    );
};


export default FormSectionMaxWidth;