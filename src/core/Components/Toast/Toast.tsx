import React, { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import classes from './Toast.module.scss';

interface Props extends PropsWithChildren<{}> { }
interface Toast {
    id: number;
    type: ToastType;
    message: string;
    isClosing: boolean;
}

const Toast: FunctionComponent<Props> = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nextToastId, setNextToastId] = useState(0);
    const [toasts, setToasts] = useState([] as Toast[]);

    const handleToast = (event: Event) => {
        // @ts-ignore
        const type = event.data.type as ToastType;
        // @ts-ignore
        const message = event.data.message as string;


        setNextToastId(currentNextToastId => {
            setToasts(currentToasts => {
                const newToast = {
                    id: currentNextToastId,
                    type,
                    message,
                    isClosing: false
                };

                if (currentToasts.find(c => c.id === currentNextToastId)) {
                    return currentToasts;
                }

                const newToasts = [...currentToasts, newToast];
                return newToasts;
            });

            setTimeout(() => {
                setToasts(currentToasts => {
                    const currentToast = currentToasts.find(t => t.id === currentNextToastId);
                    currentToast!.isClosing = true;
                    const newToasts = [...currentToasts];

                    return newToasts;
                });
            }, 8000);


            setTimeout(() => {
                setToasts(currentToasts => {
                    const newToasts = currentToasts.filter(t => t.id !== currentNextToastId);

                    return newToasts;
                });
            }, 10000);

            return currentNextToastId + 1;
        });

    };

    useEffect(() => {
        window.addEventListener('toastMessage', handleToast);
        return () => {
            window.removeEventListener('toastMessage', handleToast);
            setToasts([]);
        };
    }, []);

    return (
        <>
            {props.children}
            <div className={classes.toastContainer}>
                {toasts.map(t => {
                    let toastClass = classes.toast + ' ' + classes[t.type.toLowerCase()] + ' ';
                    if (t.isClosing) {
                        toastClass += classes.isClosing + ' ';
                    }

                    return (
                        <div key={t.id} className={toastClass}>
                            {t.message}
                        </div>
                    );
                })}
            </div>
        </>
    );
};


type ToastType = 'Error' | 'Info' | 'Success';

const showToast = (type: ToastType, message: string) => {
    const event = new Event('toastMessage');
    // @ts-ignore
    event.data = {
        type,
        message
    };

    window.dispatchEvent(event);
};


export default Toast;
export {
    showToast
};