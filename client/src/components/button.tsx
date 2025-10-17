import React from 'react';

interface ButtonProps {
    onClick: () => void;  
    label: string;
    style?: React.CSSProperties; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, style, disabled }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', ...style }} disabled={disabled}>
            {label}
        </button>
    );
}

export default Button;
