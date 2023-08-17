import { ClientActionProps } from "@/app/client/components/client-action"
import { ClientDialogProps } from "@/app/client/components/client-alert-dialog"





export const kSetAlertDialogIsOpen = "SET_ALERT_DIALOG_IS_OPEN"
export const kOpenAlertDialog = "OPEN_ALERT_DIALOG"

export const kOpenDialog = "OPEN_DIALOG"
export const kSetDialogIsOpen = "SET_DIALOG_IS_OPEN"

export interface DialogState {
  isAlertDialogOpen: boolean
  isDialogOpen: boolean
  alertDialogProps: ClientDialogProps
  dialogProps: ClientActionProps
}

interface SetDialogIsOpenAction {
  type: typeof kSetAlertDialogIsOpen
  payload: boolean
}

interface OpenAlertDialogAction {
  type: typeof kOpenAlertDialog
  payload: ClientDialogProps
}

interface OpenDialogAction {
  type: typeof kOpenDialog
  payload: ClientActionProps
}

interface CloseDialogAction {
  type: typeof kSetDialogIsOpen
  payload: boolean
}

export type DialogAction =
  | SetDialogIsOpenAction
  | OpenAlertDialogAction
  | OpenDialogAction
  | CloseDialogAction

export const dialogReducer = (
  state: DialogState,
  action: DialogAction
): DialogState => {
  switch (action.type) {
    case kSetAlertDialogIsOpen:
      return { ...state, isAlertDialogOpen: action.payload }
    case kOpenAlertDialog:
      return {
        ...state,
        isAlertDialogOpen: true,
        alertDialogProps: action.payload,
      }
    case kOpenDialog:
      return {
        ...state,
        isDialogOpen: true,
        dialogProps: action.payload,
      }
    case kSetDialogIsOpen:
      return {
        ...state,
        isDialogOpen: action.payload,
      }
    default:
      throw new Error(`Unknown action in dialogReducer: ${action}`)
  }
}
