import React, { FunctionComponent, PropsWithChildren } from 'react';


import classes from './LinkButton.module.scss';


interface Props extends PropsWithChildren<{}> {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
}


const LinkButton: FunctionComponent<Props> = (props: Props) => {
    const isDisabled = props.disabled === true;


    return <button type="button" onClick={props.onClick} disabled={isDisabled} className={classes.linkButton + ' ' + (props.className || '')}>{props.children}</button>;
};


export default LinkButton;