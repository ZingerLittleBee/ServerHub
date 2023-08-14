import { z } from "zod"

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  lct: z.string(),
})

export type Task = z.infer<typeof clientSchema>
