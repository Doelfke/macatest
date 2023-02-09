import React, { FunctionComponent, PropsWithChildren } from 'react';


import classes from './FormFooter.module.scss';


interface Props extends PropsWithChildren<{}> { }


const FormFooter: FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <div className={classes.spacer}></div>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    );
};


export default FormFooter;