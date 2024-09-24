import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useLoginModalStore = () => {
  return useAtom(modalState);
};
