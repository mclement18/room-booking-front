import { useMergeRefs } from '@floating-ui/react';
import React, {
  DetailsHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  TransitionEventHandler,
  forwardRef,
  useRef,
  useState,
} from 'react';

type AnimatedDetailsProps = Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  'open'
> & {
  openedMaxHeightClass: string;
  summaryProps: HTMLAttributes<HTMLElement>;
  summaryRef?: React.LegacyRef<HTMLElement>;
};

/**
 * Animated details element.
 * `max-height` CSS property must be set for both opened and closed states with classes.
 * `openedMaxHeightClass` prop must be provided with the name of the class setting the `max-height` for the **opened** state.
 */
const AnimatedDetails = forwardRef<HTMLDetailsElement, AnimatedDetailsProps>(
  (props, ref) => {
    const {
      openedMaxHeightClass,
      children,
      className,
      onTransitionEnd,
      summaryProps: {
        children: summaryChildren,
        onClick,
        className: summaryClassName,
        ...otherSummaryProps
      },
      summaryRef,
      ...other
    } = props;

    const [open, setOpen] = useState(false);

    const detailsRef = useRef<HTMLDetailsElement>(null);

    const mergedRef = useMergeRefs([ref, detailsRef]);

    const onSummaryClick: MouseEventHandler<HTMLElement> = (event) => {
      event.preventDefault();
      if (open) {
        detailsRef.current?.classList.remove(openedMaxHeightClass);
      } else {
        setOpen(true);
      }

      if (onClick) {
        onClick(event);
      }
    };

    const onDetailsTransitionEnd: TransitionEventHandler<HTMLDetailsElement> = (
      event
    ) => {
      if (
        event.propertyName === 'max-height' &&
        !event.currentTarget.classList.contains(openedMaxHeightClass)
      ) {
        setOpen(false);
        event.currentTarget.classList.add(openedMaxHeightClass);
      }

      if (onTransitionEnd) {
        onTransitionEnd(event);
      }
    };

    return (
      <details
        ref={mergedRef}
        {...other}
        open={open}
        onTransitionEnd={onDetailsTransitionEnd}
        className={`overflow-hidden transition-[max-height] ${className}`}
      >
        <summary
          ref={summaryRef}
          {...otherSummaryProps}
          onClick={onSummaryClick}
          className={`w-max mb-5 cursor-pointer ${summaryClassName}`}
        >
          {summaryChildren}
        </summary>
        {children}
      </details>
    );
  }
);

AnimatedDetails.displayName = 'AnimatedDetails';

export default AnimatedDetails;
