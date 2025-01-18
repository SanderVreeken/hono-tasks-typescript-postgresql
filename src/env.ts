import { z } from 'zod'

import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum([
        'fatal',
        'error',
        'warn',
        'info',
        'debug',
        'trace',
        'silent',
    ]),
    DATABASE_URL: z.string(),
})

// Only place in the code where we access process.env.
const env = envSchema.parse(process.env)

export default env
