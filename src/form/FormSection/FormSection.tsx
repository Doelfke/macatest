import React, { FunctionComponent, PropsWithChildren } from 'react';

import If from 'core/Components/If';


import classes from './FormSection.module.scss';


interface Props extends PropsWithChildren<{}> {
    title?: string;
    subTitle?: string;
    fullWith?: boolean;
    rightContol?: JSX.Element;
}


const FormSection: FunctionComponent<Props> = (props: Props) => {
    let containerClass = classes.container + ' ';
    if (props.fullWith) {
        containerClass += classes.full;
    }

    return (
        <div className={containerClass}>
            <div className={classes.subContainer}>
                <div className={classes.titles}>
                    <If show={!!props.title}>
                        <h2 className={classes.title}>{props.title}</h2>
                    </If>
                    <If show={!!props.subTitle}>
                        <h4 className={classes.subTitle}>{props.subTitle}</h4>
                    </If>
                </div>
                <If show={!!props.rightContol}>
                    <div className={classes.rightContol}>
                        {props.rightContol}
                    </div>
                </If>
                <div className={classes.spacer} />
                {props.children}
                <div className={classes.sectionSpacer} />
            </div>
        </div>
    );
};


FormSection.defaultProps = {
    fullWith: false
};

export default FormSection;