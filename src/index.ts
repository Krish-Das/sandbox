import { Hono } from "hono"

import login from "./routes/login"
import register from "./routes/register"

const app = new Hono()

app.get("/", (c) => c.text("Hono!"))
app.route("/login", login)
app.route("/register", register)

export default app