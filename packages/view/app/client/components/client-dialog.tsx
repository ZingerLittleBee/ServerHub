"use client"

import React from "react"
import Link from "next/link"
import { deleteClientRequest } from "@/requests/client/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useClientStore } from "@/app/client/store"
import { kSetDialogIsOpen } from "@/app/client/store/dialog"

export interface ClientDialogProps {
  isOpen: boolean
  title: string
  description: React.ReactNode
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void
}
// ClientCommunicationToken
export const cctTemplate = (
  token: string,
  title?: string
): ClientDialogProps => ({
  isOpen: true,
  title: title ?? "Client Communication Token",
  description: (
    <>
      This action cannot be undone. This will permanently delete your account
      and remove your data from our servers.
      <span className="mb-4 mt-6 block max-h-[650px] max-w-[460px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
        <code className="relative rounded px-[0.6rem] py-[0.2rem] font-mono text-sm">
          <span className="text-white">{`${token.slice(0, 10)}...${token.slice(
            -10
          )}`}</span>
        </code>
      </span>
      {"Don't know how to use?"}{" "}
      <Link
        href="https://docs.serverbee.app"
        target="_blank"
        className="underline"
      >
        Read the docs.
      </Link>
    </>
  ),
  cancelText: "Close",
  confirmText: "Copy and Close",
  onConfirm: () => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        toast({
          title: "Copied successfully.",
        })
      })
      .catch(() => {
        toast({
          title: "Please copy manually.",
          description: `Token: ${token}`,
        })
      })
  },
})

export const deleteConfirm = (
  clientId: string,
  title?: string
): ClientDialogProps => ({
  isOpen: true,
  title: title ?? "Are you absolutely sure?",
  description: (
    <>
      This action cannot be undone. This will permanently delete your client and
      remove your data from our servers.
    </>
  ),
  cancelText: "Cancel",
  confirmText: "Confirm",
  onConfirm: async () => {
    await deleteClientRequest(clientId)
    toast({
      title: "Client will be delete soon later.",
    })
  },
})

export function ClientDialog() {
  const { dialogState, dialogDispatch } = useClientStore()

  const { isOpen, props } = dialogState

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open: boolean) =>
        dialogDispatch({
          type: kSetDialogIsOpen,
          payload: open,
        })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{props.cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={props.onConfirm}>
            {props.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
