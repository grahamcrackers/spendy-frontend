import React from 'react';
import { classNames } from '../../utils/class-names';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
    const { className, ...rest } = props;

    const classes = classNames(
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        className,
    );

    return <button className={classes} {...rest} />;
};
