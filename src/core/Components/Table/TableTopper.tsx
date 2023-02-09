import React, { FunctionComponent } from 'react';

import classes from './TableTopper.module.scss';


interface Props {
    left: JSX.Element;
    right: JSX.Element;
}


const TableTopper: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                {props.left}
            </div>
            <div className={classes.right}>
                {props.right}
            </div>
        </div>
    );
};


export default TableTopper;