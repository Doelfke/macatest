import React, { FunctionComponent } from 'react';


import classes from './Icon.module.scss';
import { IconNames } from 'core/Components/Icon';
import { Color } from '../../../Color';


interface Props {
    name: IconNames;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x' | '4x' | '5x' | 'table';

    color: Color;
    backgroundColor?: Color;
    marginBottom?: string;

    onClick?: () => void;

    className?: string;
}

const Icon: FunctionComponent<Props> = (props: Props) => {

    // The !'s let us use any webpack loader we want, without having to eject
    const SVGIcon = require(`!react-svg-loader!/${props.name}.svg`).default;

    const className = classes.inlineIcon + ' ' + classes['size-' + props.size] + ' ' + props.className;

    return (
        <SVGIcon
            aria-hidden="true"
            tabIndex={props.onClick ? 0 : undefined}
            style={{
                cursor: props.onClick ? 'pointer' : undefined,
                color: props.color,
                fill: props.backgroundColor,
                marginBottom: props.marginBottom
            }}
            onClick={props.onClick}
            className={className}>
        </SVGIcon>
    );
};

Icon.defaultProps = {
    backgroundColor: Color.transparent
};



export default Icon;