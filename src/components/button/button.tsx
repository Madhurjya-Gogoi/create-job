import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'contained', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md focus:outline-none transition';

  let classes;
  switch (variant) {
    case 'contained':
      classes = `bg-primary text-white ${baseClasses} font-sans font-medium`;
      break;
    case 'outline':
      classes = `bg-white border border-primary text-primary ${baseClasses} hover:bg-blue-100 font-sans font-medium`;
      break;
    default:
      classes = `bg-primary text-white ${baseClasses} font-sans font-medium`;
  }

  return <button className={classes} {...props} />;
};

export default Button;
