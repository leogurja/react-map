import { useCallback } from "react";

export function useMergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
    // false positive, we want to check each ref for changes
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
