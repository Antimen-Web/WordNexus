import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./Store";
import { useEffect, useRef } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
