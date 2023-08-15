"use client"

import { ReactNode, useRef } from "react"
import { Usb } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDisk } from "@/app/hooks/useClientDetail"
import { computeDiskUsage } from '@/utils/common'

export type DiskDetailProps = {
  trigger: ReactNode
  clientId: string
}

export default function DiskDetailView({ clientId, trigger }: DiskDetailProps) {
  const { disks, isLoading, isError } = useDisk(clientId)

  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const selectArea = () => {
    return (
      <Select
        onValueChange={(value) => {
          const index = disks?.findIndex(
            (disk, index) => `${disk.name}-${index}` === value
          )
          if (index !== undefined && index !== -1) {
            cardsRef.current[index]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select disk" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          <SelectGroup>
            <SelectLabel>Disk Name</SelectLabel>
            {disks?.map((disk, index) => (
              <SelectItem
                key={`${disk.name}-${index}`}
                value={`${disk.name}-${index}`}
              >
                {disk.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  const DiskDetailView = () => {
    return (
      <div
        className="grid grid-flow-row gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
        }}
      >
        {disks?.map((disk, index) => {
          return (
            <Card
              key={`${disk.name}_${index}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <CardHeader>
                <CardTitle className="tracking-wide">{disk.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {disk.removeable && RemoveableView()}
                  {disk.file_system && FileSystemView(disk.file_system)}
                  <Badge variant="outline">{disk.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2">
                  <span className="flex items-center gap-2 text-indigo-500 dark:text-indigo-300">
                    {FreeSpaceView()}
                    {disk.available}
                  </span>
                  <span className="flex items-center gap-2 text-fuchsia-400">
                    {TotalSpaceView()}
                    {disk.total}
                  </span>
                  <Progress
                    value={
                      disk.available && disk.total
                        ? computeDiskUsage(disk.available, disk.total)
                        : 100
                    }
                    className="col-span-2 my-2"
                  />
                  {disk.available && disk.total && (
                    <span className="text-md col-span-2 text-center text-muted-foreground">
                      {`${computeDiskUsage(disk.available, disk.total)}% used`}
                    </span>
                  )}
                </div>
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
            {isError ? "Somethings went wrong, Please try again." : "Disk"}
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
          {isLoading || isError ? DiskDetailSkeleton() : DiskDetailView()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const DiskDetailSkeleton = () => {
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

const FileSystemView = (fileSystem: string) => {
  return (
    <Badge variant="secondary">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{fileSystem}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>File System</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  )
}

const RemoveableView = () => {
  return (
    <Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Usb size="15" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Removable Disk</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  )
}

const FreeSpaceView = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="h-5 w-5 select-none">
            <AvatarFallback className="text-[12px]">F</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>Free Space</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const TotalSpaceView = () => {
  return (
    <Avatar className="h-5 w-5 select-none">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AvatarFallback className="text-[12px]">T</AvatarFallback>
          </TooltipTrigger>
          <TooltipContent>
            <p>Total Space</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Avatar>
  )
}
