import React, { HTMLAttributes } from 'react';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'light' | 'medium' | 'semibold' | 'extrabold';
  textColor?: string;
}

const Label: React.FC<LabelProps> = ({ fontSize, fontWeight, textColor, ...props }) => {
  let classes = '';

  if (fontSize) {
    classes += ` text-${fontSize}`;
  }

  if (fontWeight) {
    classes += ` font-${fontWeight}`;
  }

  if (textColor) {
    classes += ` text-${textColor}`;
  }

  return <label className={classes} {...props} />;
};

export default Label;
