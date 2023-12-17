import React from 'react';

interface ButtonProps {
    onClick: () => void;  
    label: string;
    style?: React.CSSProperties; 
}

const Button: React.FC<ButtonProps> = ({ onClick, label, style }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', ...style }}>
            {label}
        </button>
    );
}

export default Button;
