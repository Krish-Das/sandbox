import { Hono } from "hono"

import { registerSchema } from "@/schemas"

const register = new Hono().post(async (c) => {
    const start = performance.now()
    const body = (await c.req.json()) as unknown
    const parsed = registerSchema.safeParse(body)
    if (parsed.error) {
        console.error({
            code: "REGISTER_VALIDATION_FAILED",
            message: "Register form payload failed validation",
            issues: parsed.error.issues.map((issue) => ({
                path: issue.path.join("."),
                code: issue.code,
                message: issue.message,
            })),
        })
        return c.text("Invalid", 400)
    }

    const end = performance.now()
    const time = end - start
    console.info(`Registration took ${time.toFixed(3)}ms`)
    return c.text("OK", 200)
})

export default register