import React, { InputHTMLAttributes } from 'react';
import Label from '../label';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

type Props = InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, Props>((props: Props, ref): JSX.Element => {
  const { label, placeholder, isRequired, ...prop } = props;
  return (
    <div className="grid grid-cols-1 gap-[4px] mb-4">
      {label ? (
        <Label className="block text-dark font-sans font-semibold text-sm">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </Label>
      ) : (
        <Label className="block text-dark font-sans font-semibold text-sm invisible">.</Label>
      )}
      <input
        className="w-full px-3 py-2 border rounded-md border-gray focus:outline-none placeholder-textGray font-sans"
        placeholder={placeholder}
        {...prop}
        ref={ref}
      />
    </div>
  );
});

export default InputField;
