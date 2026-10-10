import { Hono } from "hono"

import login from "./routes/login"

const app = new Hono()

app.get("/", (c) => c.text("Hono!"))
app.route("/login", login)

export default app