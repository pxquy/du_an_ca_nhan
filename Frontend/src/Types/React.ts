import type { ReactElement, ReactNode } from "react";

export type TGlobalProps<T = {}> = {
  children: ReactNode;
} & T;
