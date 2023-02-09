import React, { FunctionComponent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<{}> {
    show: boolean;
}

const If: FunctionComponent<Props> = (props: Props) => {
    if (!props.show) {
        return <></>;
    }
    return (
        <>
            {props.children}
        </>
    );
};

export default If;
