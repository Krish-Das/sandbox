import { z } from "zod/v4"

const schema = z.object({
    email: z.email(),
    password: z.string().min(1),
})

export type LoginSchemaType = z.infer<typeof schema>

export { schema as loginSchema }