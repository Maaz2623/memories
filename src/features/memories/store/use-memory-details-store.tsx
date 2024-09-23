import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useMemoryDetails = () => {
  return useAtom(modalState);
};
