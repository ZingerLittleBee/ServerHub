"use client"

import * as React from "react"
import { useState } from "react"
import { addClientRequest } from "@/requests/client/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import {
  ClientAlertDialog,
  cctTemplate,
} from "@/app/client/components/client-alert-dialog"
import { useClientStore } from "@/app/client/store"
import { kOpenAlertDialog, kSetDialogIsOpen } from "@/app/client/store/dialog"

export enum ClientActionEnum {
  ADD,
  EDIT,
}

export type ClientActionProps = {
  action?: ClientActionEnum
}

export function ClientAction() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dialogState, dialogDispatch } = useClientStore()
  const { isDialogOpen, dialogProps } = dialogState

  const formSchema = z.object({
    name: z.string().nonempty({ message: "Not Empty" }).trim(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false,
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    switch (action) {
      case ClientActionEnum.ADD:
        const {
          success,
          data: clientVo,
          message,
        } = await addClientRequest(data.name)
        success
          ? toast({
              title: "Client added successfully.",
            })
          : toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: message,
            })
        if (success && clientVo) {
          dialogDispatch({
            type: kOpenAlertDialog,
            payload: cctTemplate(clientVo?.token ?? ""),
          })
        }
        break
      case ClientActionEnum.EDIT:
        const { success: editSuccess, message: editMessage } =
          await addClientRequest(data.name)
        editSuccess
          ? toast({
              title: "Client edit successfully.",
            })
          : toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: editMessage,
            })
        break
    }
    setIsLoading(false)
    dialogDispatch({
      type: kSetDialogIsOpen,
      payload: false,
    })
  }

  let action = dialogProps.action

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open: boolean) =>
          dialogDispatch({
            type: kSetDialogIsOpen,
            payload: open,
          })
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {action === ClientActionEnum.ADD ? "Add Client" : "Edit Client"}
            </DialogTitle>
            <DialogDescription>
              {action === ClientActionEnum.ADD
                ? "Add Client here. Click save when you're done."
                : "Edit Client here. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel htmlFor="name" className="text-right">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input className="col-span-3" {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                      <FormMessage className="pt-2 text-right" />
                    </div>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ClientAlertDialog />
    </>
  )
}
