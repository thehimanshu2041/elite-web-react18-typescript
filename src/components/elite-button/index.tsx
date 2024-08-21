import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface EliteButtonProps extends ButtonProps {
}

const EliteButton: React.FC<EliteButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={`bg-blue hover:bg-light-blue text-white py-2 px-3 rounded-lg ${className}`}
    >
      {children}
    </Button>
  );
};

export default EliteButton;
