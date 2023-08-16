"use client"

import { ReactNode, useRef } from "react"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useNetwork } from "@/app/hooks/useClientDetail"

export type NetworkInfoProps = {
  trigger: ReactNode
  clientId: string
}

export default function NetworkInfo({ clientId, trigger }: NetworkInfoProps) {
  const { networks, isLoading, isError } = useNetwork(clientId)

  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const selectArea = () => {
    return (
      <Select
        onValueChange={(value) => {
          const index = networks?.findIndex((network) => network.name === value)
          if (index !== undefined && index !== -1) {
            cardsRef.current[index]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          <SelectGroup>
            <SelectLabel>Interface Name</SelectLabel>
            {networks?.map((network) => (
              <SelectItem
                key={network.name}
                value={network.name}
              >
                <div className="grid grid-cols-2">
                  <span className="text-left">{network.name}</span>
                  <span className="w-40 rounded-md bg-muted text-center">{network.mac}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  const cardContent = () => {
    return (
      <div
        className="grid grid-flow-row gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
        }}
      >
        {networks?.map((network, index) => {
          return (
            <Card
              key={`${network.name}_${index}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <CardHeader>
                <CardTitle className="tracking-wide">{network.name}</CardTitle>
                <CardDescription>{network.mac}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="flex items-center gap-2 text-indigo-500 dark:text-indigo-300">
                    <ArrowUpCircleIcon size="18" /> {network.tx}
                  </span>
                  <span className="flex items-center gap-2 text-fuchsia-400">
                    <ArrowDownCircleIcon size="18" /> {network.rx}
                  </span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isError ? "Somethings went wrong, Please try again." : "Network"}
          </DialogTitle>
          {isLoading || isError ? (
            <Skeleton className="h-8 w-2/3 py-2"></Skeleton>
          ) : (
            <DialogDescription className="py-2">
              {selectArea()}
            </DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className="h-[360px]">
          {isLoading || isError ? NetworkInfoSkeleton() : cardContent()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const NetworkInfoSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 py-2">
      {new Array(5).fill(0).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
