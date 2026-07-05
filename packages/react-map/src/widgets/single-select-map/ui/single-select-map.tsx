import { useCallback } from "react";

import { SvgMap, type SvgMapProps } from "@/entities/path-map";
import { HoverableMap, type HoverableMapProps } from "@/features/hoverable-map";
import { useControlled } from "@/shared/lib/use-controlled";

interface CommonSingleSelectMapProps<T extends string> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  defaultValue?: T | null;
}

interface HoverableSingleSelectMapProps<T extends string>
  extends CommonSingleSelectMapProps<T>, Omit<HoverableMapProps<T>, "onPathClick" | "isSelected"> {
  disableHover?: false;
}

interface NotHoverableSingleSelectMapProps<T extends string>
  extends CommonSingleSelectMapProps<T>, Omit<SvgMapProps<T>, "onPathClick" | "isSelected"> {
  disableHover: true;
}

export type SingleSelectMapProps<T extends string> =
  | HoverableSingleSelectMapProps<T>
  | NotHoverableSingleSelectMapProps<T>;

export function SingleSelectMap<T extends string>({
  value,
  onChange,
  defaultValue,
  disableHover,
  ...rest
}: SingleSelectMapProps<T>) {
  const [selectedState, setSelectedState] = useControlled({
    controlled: value,
    default: defaultValue,
    name: "SingleSelectMap",
    state: "value",
  });

  const handleClick = useCallback(
    (state: T) => {
      const newValue = selectedState === state ? null : state;

      setSelectedState(newValue);
      onChange?.(newValue);
    },
    [setSelectedState, selectedState, onChange],
  );

  const isSelected = useCallback((state: T) => state === selectedState, [selectedState]);

  if (disableHover) return <SvgMap {...rest} onPathClick={handleClick} isSelected={isSelected} />;

  return <HoverableMap {...rest} onPathClick={handleClick} isSelected={isSelected} />;
}
