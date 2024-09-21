import {atom, useAtom} from 'jotai'

const modalState = atom(false)

export const useCreateYearModal = () => {
    return useAtom(modalState)
}