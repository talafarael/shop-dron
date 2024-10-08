import React from "react";
import { IDefaultData } from "./newData";

export interface ICountState {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
export interface IOrdertState {
  order: IDefaultData[] | undefined | string[];
  setOrder: React.Dispatch<
    React.SetStateAction<IDefaultData[] | undefined | string[]>
  >;
  handlerAdd: (data?: string) => void;
  handlerMinus: (id?: string | undefined) => void;
  handlerDelete: (id?: string | undefined) => void;
  clearOrder: () => void;
}
