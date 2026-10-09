import { z } from "zod/v4"

const schema = z.object({
    email: z.email(),
    password: z.string().min(1),
})

export type RegisterSchemaType = z.infer<typeof schema>

export { schema as registerSchema }