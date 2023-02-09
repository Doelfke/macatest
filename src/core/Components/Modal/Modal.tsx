import React, { PropsWithChildren, useEffect } from 'react';

import If from 'core/Components/If';

import classes from './Modal.module.scss';
import Icon from 'core/Components/Icon/Icon';
import { Color } from '../../../Color';


interface Props extends PropsWithChildren<{}> {
    isOpen: boolean;
    onRequestClose: () => void;
}


const Modal = (props: Props) => {

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && props.isOpen) {
                props.onRequestClose();
            }
        };
        window.addEventListener('keydown', onEscape);

        return () => {
            window.removeEventListener('keydown', onEscape);
        };
    });

    const closeWhenClickingBackground = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            props.onRequestClose();
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <If show={props.isOpen}>
            <div className={classes.background} onClick={closeWhenClickingBackground}>
                <div className={classes.container}>
                    <div className={classes.closeContainer}>
                        <div className={classes.close}>
                            <Icon name="x" color={Color.utility_black} size="lg" onClick={props.onRequestClose} />
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </If>
    );



};

export default Modal;

