"use client"

import * as React from "react"
import { Metadata } from "next"
import { AlertCircle } from "lucide-react"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useAllClient } from "@/app/hooks/useClientDetail"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { clientSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Client",
  description: "Client page.",
}

export default function ClientPage() {
  const { clients, isError, isLoading } = useAllClient()
  if (isError)
    return (
      <>
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Alert
            variant="destructive"
            className="bg-background dark:text-red-400 [&>svg]:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please check console for more information.
            </AlertDescription>
          </Alert>
        </div>
        <div className="top-0">
          <ClientPageSkeleton />
        </div>
      </>
    )

  if (isLoading) return <ClientPageSkeleton />
  return (
    <div className="h-full flex-1 flex-col space-y-8 py-8">
      <DataTable
        data={z.array(clientSchema).parse(clients)}
        columns={columns}
      />
    </div>
  )
}

const ClientPageSkeleton = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 py-8">
      <div className="flex flex-row justify-between">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="flex flex-col space-y-2">
        {new Array(10).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
      <div className="flex flex-row justify-end">
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  )
}
