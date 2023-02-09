import React, { FunctionComponent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<{}> {
    title: string;
}

const Page: FunctionComponent<Props> = (props: Props) => {
    return (
        <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ margin: '0 auto', paddingBottom: '50px' }}>{props.title}</h1>
                {props.children}
            </div>
        </div>
    );
};

export default Page;
