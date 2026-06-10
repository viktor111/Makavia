import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className, style, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={className ? `mk-btn ${className}` : 'mk-btn'}
            style={style}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
