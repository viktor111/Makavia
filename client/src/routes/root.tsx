import React from 'react';
import Button from '../components/button';

const Root: React.FC = () => {

    const handleClick = () => {
        console.log('Button clicked!');
    };

    return (
        <div>
            <h1>Hello, World!</h1>

            <Button label='Start Game' onClick={handleClick}/>
        </div>
    );
};

export default Root;
