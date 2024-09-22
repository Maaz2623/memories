import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useMemoryDetailsStore = () => {
  return useAtom(modalState);
};
