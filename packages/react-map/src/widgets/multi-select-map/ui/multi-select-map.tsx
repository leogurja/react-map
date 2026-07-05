import { useCallback, useMemo } from "react";

import { SvgMap, type SvgMapProps } from "@/entities/path-map";
import { HoverableMap, type HoverableMapProps } from "@/features/hoverable-map";
import { useControlled } from "@/shared/lib/use-controlled";

interface CommonMultiSelectMapProps<T extends string> {
  value?: T[];
  onChange?: (value: T[]) => void;
  defaultValue?: T[];
}

interface HoverableMultiSelectMapProps<T extends string>
  extends CommonMultiSelectMapProps<T>, Omit<HoverableMapProps<T>, "onPathClick" | "isSelected"> {
  disableHover?: false;
}

interface NotHoverableMultiSelectMapProps<T extends string>
  extends CommonMultiSelectMapProps<T>, Omit<SvgMapProps<T>, "onPathClick" | "isSelected"> {
  disableHover: true;
}

export type MultiSelectMapProps<T extends string> =
  | HoverableMultiSelectMapProps<T>
  | NotHoverableMultiSelectMapProps<T>;

export function MultiSelectMap<T extends string>({
  value,
  onChange,
  defaultValue,
  disableHover,
  ...rest
}: MultiSelectMapProps<T>) {
  const [selectedState, setSelectedState] = useControlled({
    controlled: value,
    default: useMemo(() => defaultValue ?? [], [defaultValue]),
    name: "MultiSelectMap",
    state: "value",
  });

  const handleClick = useCallback(
    (state: T) => {
      const newValue = selectedState.includes(state)
        ? selectedState.filter((s) => s !== state)
        : [...selectedState, state];

      setSelectedState(newValue);
      onChange?.(newValue);
    },
    [setSelectedState, onChange, selectedState],
  );

  const isSelected = useCallback((state: T) => selectedState.includes(state), [selectedState]);

  if (disableHover) return <SvgMap {...rest} onPathClick={handleClick} isSelected={isSelected} />;

  return <HoverableMap {...rest} onPathClick={handleClick} isSelected={isSelected} />;
}
