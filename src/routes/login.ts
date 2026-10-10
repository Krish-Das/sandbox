import { Hono } from "hono"

import { loginSchema } from "@/schemas"

const login = new Hono()

login.post("/", async (c) => {
    const start = performance.now()
    const body = (await c.req.json()) as unknown
    const parsed = loginSchema.safeParse(body)
    if (parsed.error) {
        console.error({
            code: "LOGIN_VALIDATION_FAILED",
            message: "Login form payload failed validation",
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
    console.info(`Login took ${time.toFixed(3)}ms`)
    return c.text("ok", 200)
})

export default login