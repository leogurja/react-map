import { useEffect, useRef, useState } from 'react';

interface UseControllableStateProps<T> {
  value?: T | undefined;
  onChange?: ((state: T) => void) | undefined;
  defaultValue: T;
}

export function useControllableState<T>({
  value,
  onChange,
  defaultValue
}: UseControllableStateProps<T>) {
  const isControlled = value !== undefined;
  const lastIsControlled = useRef<boolean>(isControlled);
  const uncontrolledState = useState(value ?? defaultValue);

  useEffect(() => {
    if (lastIsControlled.current !== isControlled) {
      console.warn(`[@gurgelio/react-map]: state changed from controlled to uncontrolled or vice versa.
        This will cause the state to be inconsistent. Use null instead of undefined to represent an empty state`);
      lastIsControlled.current = isControlled;
    }
  }, [isControlled]);

  if (isControlled) {
    return [value, onChange] as const;
  }

  return uncontrolledState;
}
