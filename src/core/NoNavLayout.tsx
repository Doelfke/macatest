import React, { FunctionComponent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<{}> { }

const NoNavLayout: FunctionComponent<Props> = (props: Props) => {
    return (
        <div style={{ padding: '25px', fontSize: '16px' }}>
            {props.children}
        </div>
    );
};

export default NoNavLayout;
