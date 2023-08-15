import { z } from "zod"

export const clientSchema = z.object({
  clientId: z.string(),
  name: z.string(),
  status: z.string(),
  lastCommunication: z.string(),
})

export type Task = z.infer<typeof clientSchema>
