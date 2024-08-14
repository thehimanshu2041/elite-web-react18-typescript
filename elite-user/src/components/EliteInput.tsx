import React from 'react';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';

interface EliteInputProps extends StandardTextFieldProps {
}

const EliteInput: React.FC<EliteInputProps> = ({ className, ...props }) => {
    return (
        <TextField
            {...props}
            className={`w-full ${className}`}
            variant="outlined"
            InputProps={{
                className: 'rounded-lg',
            }}
        />
    );
};

export default EliteInput;
