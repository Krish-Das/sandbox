import { Hono } from "hono"

import login from "./routes/login"
import register from "./routes/register"

const app = new Hono()
    .get("/", (c) => c.text("Hono!"))
    .route("/login", login)
    .route("/register", register)

export default app