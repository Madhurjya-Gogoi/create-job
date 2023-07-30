import React, { InputHTMLAttributes } from 'react';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

type Props = RadioButtonProps & React.InputHTMLAttributes<HTMLInputElement>;

const RadioButton = React.forwardRef<HTMLInputElement, Props>((props: Props, ref): JSX.Element => {
  const { label } = props;
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        className="w-5 h-5 rounded-full ring-gray cursor-pointer"
        {...props}
        ref={ref}
      />
      <span className="text-textGray font-sans">{label}</span>
    </label>
  );
});

export default RadioButton;
