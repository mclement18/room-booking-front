import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  FloatingFocusManager,
  flip,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
  useMergeRefs,
} from '@floating-ui/react';
import { Color, colors } from '@/constants/colors';
import ColorSwatch from './ColorSwatch';

interface ColorPickerProp {
  name?: string;
  value?: Color;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
}

const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProp>(
  ({ label, value, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const swatchRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      ...(inputRef.current as HTMLInputElement),
      focus: () => swatchRef.current?.focus(),
    }));

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'top-start',
      middleware: [offset(10), flip(), shift()],
    });

    const mergedRef = useMergeRefs([swatchRef, refs.setReference]);

    const click = useClick(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click]);

    const [colorValue, setColorValue] = useState<Color>(value || 'blue');
    const inputId = useId();

    const swatchClick =
      (color: Color) => (event: React.MouseEvent<HTMLSpanElement>) => {
        setColorValue(color);
        setIsOpen(false);
        if (inputProps.onChange) {
          const nativeEvent = event.nativeEvent || event;
          const clonedEvent = new (nativeEvent.constructor as {
            new (type: string, event: Event): typeof nativeEvent;
          })(nativeEvent.type, nativeEvent);

          Object.defineProperty(clonedEvent, 'target', {
            writable: true,
            value: { value: color, name: inputProps.name },
          });
          inputProps.onChange(
            clonedEvent as unknown as ChangeEvent<HTMLInputElement>
          );
        }
      };

    const swatchKeyDown =
      (color: Color) => (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter') {
          setColorValue(color);
          setIsOpen(false);
          if (inputProps.onChange) {
            const nativeEvent = event.nativeEvent || event;
            const clonedEvent = new (nativeEvent.constructor as {
              new (type: string, event: Event): typeof nativeEvent;
            })(nativeEvent.type, nativeEvent);

            Object.defineProperty(clonedEvent, 'target', {
              writable: true,
              value: { value: color, name: inputProps.name },
            });
            inputProps.onChange(
              clonedEvent as unknown as ChangeEvent<HTMLInputElement>
            );
          }
        }
      };

    return (
      <fieldset className="flex">
        {label && (
          <label htmlFor={inputId} className="text-electric-green-300 mr-2">
            {label}:
          </label>
        )}
        <input
          ref={inputRef}
          id={inputId}
          {...inputProps}
          value={colorValue}
          hidden
        />
        <ColorSwatch
          ref={mergedRef}
          tabIndex={0}
          color={colorValue}
          className="cursor-pointer"
          {...getReferenceProps()}
        />
        {isOpen && (
          <FloatingFocusManager context={context} initialFocus={0}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="
                  p-2 grid grid-cols-3 gap-2
                  bg-black bg-gradient-to-br from-transparent to-electric-green-900
                  rounded border border-electric-green-700
                "
              {...getFloatingProps()}
            >
              {colors.map((color) => (
                <ColorSwatch
                  key={color}
                  tabIndex={0}
                  color={color}
                  className="cursor-pointer"
                  title={color}
                  onClick={swatchClick(color)}
                  onKeyDown={swatchKeyDown(color)}
                />
              ))}
            </div>
          </FloatingFocusManager>
        )}
      </fieldset>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
