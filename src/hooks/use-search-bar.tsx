import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useSearchBar = () => {
  return useAtom(modalState);
};
