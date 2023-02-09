import React, { FunctionComponent, PropsWithChildren } from 'react';

import If from './If';
import classes from './Loading.module.scss';


interface Props extends PropsWithChildren<{}> {
    isLoading: boolean;
}

const Loading: FunctionComponent<Props> = (props: Props) => {
    return <>
        <If show={props.isLoading}>
            <div className={classes.container}>
                <div className={classes.outer}>
                    <div className={classes.inner}></div>
                    <div className={classes.colored}></div>
                </div>
            </div>
        </If>
        <If show={!props.isLoading}>
            {props.children}
        </If>
    </>;
};


export default Loading;