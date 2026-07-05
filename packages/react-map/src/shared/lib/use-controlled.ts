import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

export interface UseControlledProps<T = unknown> {
  /** Holds the component value when it's controlled. */
  controlled: T | undefined;
  /** The default value when uncontrolled. */
  default: T | undefined;
  /** The component name displayed in warnings. */
  name: string;
  /** The name of the state variable displayed in warnings. */
  state?: string | undefined;
}

export function useControlled<T = unknown>({
  controlled,
  default: defaultProp,
  name,
  state = "value",
}: UseControlledProps<T>) {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  if (process.env.NODE_ENV !== "production") {
    const logControlChangeError = useEffectEvent(() => {
      console.error(
        [
          `[@gurgelio/react-map]: A component is changing the ${
            isControlled ? "" : "un"
          }controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`,
          "Elements should not switch from uncontrolled to controlled (or vice versa).",
          `Decide between using a controlled or uncontrolled ${name} ` +
            "element for the lifetime of the component.",
          "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
          "More info: https://fb.me/controlled-components",
        ].join("\n"),
      );
    });

    const logDefaultPropChangeError = useEffectEvent(() => {
      console.error(
        [
          `[@gurgelio/react-map]: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
            `To suppress this warning opt to use a controlled ${name}.`,
        ].join("\n"),
      );
    });

    const { current: defaultValue } = useRef(defaultProp);

    useEffect(() => {
      if (isControlled !== (controlled !== undefined)) logControlChangeError();
    }, [state, name, controlled]);

    useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) logDefaultPropChangeError();
    }, [defaultProp]);
  }

  const setValueIfUncontrolled = useCallback((newValue: React.SetStateAction<T>) => {
    if (!isControlled) setValue(newValue as T);
  }, []);

  return [value as T, setValueIfUncontrolled] as const;
}
