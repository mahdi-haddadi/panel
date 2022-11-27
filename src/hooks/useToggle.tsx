import { useCallback, useState } from "react";

const useToggle = (initialState?: boolean) => {
  const [state, setState] = useState<boolean>(!!initialState);
  const close = useCallback(() => setState(false), []);
  const open = useCallback(() => setState(true), []);
  const toggle = useCallback(() => setState((state) => !state), []);
  return { state, close, open, toggle };
};
export default useToggle;
