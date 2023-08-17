import { Metadata } from "next"

import { ClientStateProvider } from "@/app/client/store"
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Client",
  description: "Client page.",
}

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <section className="container relative grid items-center gap-6">
      <ClientStateProvider>{children}</ClientStateProvider>
    </section>
  )
}
