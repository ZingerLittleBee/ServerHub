"use client"

import React, { ReactNode, createContext, useContext, useReducer } from "react"

import { ClientActionProps } from "@/app/client/components/client-action"
import { ClientDialogProps } from "@/app/client/components/client-alert-dialog"
import {
  DialogAction,
  DialogState,
  dialogReducer,
} from "@/app/client/store/dialog"

interface ClientStateContextProps {
  dialogState: DialogState
  dialogDispatch: React.Dispatch<DialogAction>
}

const ClientStateContext = createContext<ClientStateContextProps>(
  {} as ClientStateContextProps
)

interface ClientStateProviderProps {
  children: ReactNode
}

const ClientStateProvider = ({
  children,
}: ClientStateProviderProps): React.JSX.Element => {
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, {
    isAlertDialogOpen: false,
    alertDialogProps: {} as ClientDialogProps,
    isDialogOpen: false,
    dialogProps: {} as ClientActionProps,
  })

  return (
    <ClientStateContext.Provider value={{ dialogState, dialogDispatch }}>
      {children}
    </ClientStateContext.Provider>
  )
}

const useClientStore = () =>
  useContext<ClientStateContextProps>(ClientStateContext)

export { ClientStateProvider, useClientStore }
