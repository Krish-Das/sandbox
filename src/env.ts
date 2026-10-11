const envKeys = ["DATABASE_URL", "DATABASE_URL_UNPOOLED"] as const
export type EnvKey = (typeof envKeys)[number]
export type Env = Readonly<Record<EnvKey, string>>

function loadEnv(): Env {
    const missing = envKeys.filter((key) => !Bun.env[key])
    if (missing.length > 0)
        throw new Error(`Missing environment variables: ${missing.join(", ")}`)

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return Object.fromEntries(envKeys.map((key) => [key, Bun.env[key]])) as Env
}

export const env = loadEnv()