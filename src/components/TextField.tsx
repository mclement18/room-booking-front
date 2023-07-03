import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useId,
} from 'react';

interface TextFieldProps {
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, value, onChange, onBlur, label, className }, ref) => {
    const inputId = useId();
    return (
      <fieldset>
        {label && (
          <label htmlFor={inputId} className="mr-2 text-electric-green-300">
            {label}:
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            px-2 bg-transparent border-b-2 border-electric-green-500 
            focus:border-electric-green-100 focus-visible:outline-none
            ${className ? className : ''}
          `}
        />
      </fieldset>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
