import {
  FloatingFocusManager,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';
import isEqual from 'lodash/isEqual';
import React, {
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from 'react';

type SelectInputContextType<T> = {
  onClick: (option: T) => void;
  nameGetter: (option: T) => React.ReactNode;
  selected?: T;
};

const SelectInputContext = createContext<SelectInputContextType<string> | null>(
  null
);

function useSelectInput<T>() {
  const selectContext = useContext<SelectInputContextType<T> | null>(
    SelectInputContext as unknown as React.Context<SelectInputContextType<T> | null>
  );

  if (selectContext === null) {
    throw new Error('useSelectInput must used whithin SelectInput');
  }

  return selectContext;
}

type SelectOptionProps<T> = {
  option: T;
};

export const SelectOption = <T,>({ option }: SelectOptionProps<T>) => {
  const { onClick, nameGetter, selected } = useSelectInput<T>();

  const onOptionClick = () => onClick(option);

  const selectedClasses = isEqual(option, selected)
    ? 'bg-electric-green-600'
    : '';

  return (
    <li
      tabIndex={0}
      onClick={onOptionClick}
      className={`cursor-pointer px-2 hover:bg-electric-green-800 ${selectedClasses}`}
    >
      {nameGetter(option)}
    </li>
  );
};

type SelectInputProps<T> = PropsWithChildren<{
  label?: string;
  value?: T;
  name?: string;
  placeholder?: string;
  onChange?: (value: T) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  nameGetter?: (option: T) => React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}>;

const SelectInputNoRef = <T,>(
  {
    label,
    value,
    name,
    placeholder,
    onChange,
    onBlur,
    nameGetter = (option) => JSON.stringify(option),
    fullWidth = false,
    disabled = false,
    children,
  }: SelectInputProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const Provider = SelectInputContext.Provider as unknown as React.Provider<
    SelectInputContextType<T>
  >;

  const selectId = useId();

  const [selected, setSelected] = useState<T | undefined>(value);

  const [isOpen, setIsOpen] = useState(false);

  const { context, refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    middleware: [offset(5), flip()],
  });

  const mergedRef = useMergeRefs([ref, refs.setReference]);

  const click = useClick(context);

  const dismiss = useDismiss(context);

  const { isMounted, styles } = useTransitionStyles(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);

  const onOptionClick = (option: T) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Provider value={{ onClick: onOptionClick, nameGetter, selected }}>
      <fieldset className={fullWidth ? 'flex flex-nowrap w-full' : ''}>
        {label && (
          <label htmlFor={selectId} className="text-electric-green-300 mr-2">
            {label}:
          </label>
        )}
        <div
          className={
            fullWidth ? 'inline-block relative w-full' : 'inline-block relative'
          }
        >
          <button
            id={selectId}
            type="button"
            name={name}
            ref={mergedRef}
            onBlur={onBlur}
            {...getReferenceProps()}
            disabled={disabled}
            className="
              flex w-full border-b-2 border-electric-green-700 pl-2
              hover:border-electric-green-100 active:border-electric-green-100 focus:border-electric-green-100
              disabled:border-electric-green-700
            "
          >
            {selected ? (
              <span className="mr-2">{nameGetter(selected)}</span>
            ) : (
              <span className="text-electric-green-600 mr-2">
                {placeholder || 'Select an option...'}
              </span>
            )}
            <span className="ml-auto">
              <svg
                className="h-5 w-5 fill-electric-green-400"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isMounted && (
            <FloatingFocusManager context={context}>
              <ul
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  ...styles,
                }}
                {...getFloatingProps()}
                className="
                  min-w-full py-2 border border-electric-green-700 rounded-sm
                  bg-black bg-gradient-radial from-electric-green-900 from-15% to-transparent
                  shadow-md shadow-electric-green-900
                "
              >
                {children}
              </ul>
            </FloatingFocusManager>
          )}
        </div>
      </fieldset>
    </Provider>
  );
};

const SelectInput = forwardRef(SelectInputNoRef) as (<T>(
  props: SelectInputProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof SelectInputNoRef>) & { displayName?: string };

SelectInput.displayName = 'SelectInput';

export default SelectInput;
