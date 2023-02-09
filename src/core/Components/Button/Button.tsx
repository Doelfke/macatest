import React, { FunctionComponent, PropsWithChildren } from 'react';

import classes from './Button.module.scss';


interface Props extends PropsWithChildren<{}> {
    type?: 'Primary' | 'Secondary';
    size?: 'Large' | 'Small';
    fullWidth?: boolean;

    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;

    isSubmit?: boolean;
}


const Button: FunctionComponent<Props> = (props: Props) => {
    const isDisabled = props.disabled === true;
    const isFullWidth = props.fullWidth === true;

    let className = classes.button + ' ';

    if (props.size === 'Large') {
        className += classes.buttonLarge + ' ';
    } else {
        className += classes.buttonSmall + ' ';
    }
    if (props.type === 'Primary') {
        className += classes.buttonPrimary + ' ';
    } else {
        className += classes.buttonSecondary + ' ';
    }

    if (isFullWidth) {
        className += classes.buttonFullWidth + ' ';
    }

    const buttonType = props.isSubmit === true ? 'submit' : 'button';

    return <button type={buttonType} onClick={props.onClick} disabled={isDisabled} className={className}>{props.children}</button>;
};


Button.defaultProps = {
    type: 'Primary',
    size: 'Large',
    fullWidth: true
};

export default Button;