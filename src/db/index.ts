import { drizzle } from 'drizzle-orm/node-postgres'
import env from '@/env'

// Import all the schemas from the schema file.
import * as schema from './schema'

const db = drizzle(env.DATABASE_URL, {
    schema,
})

export default db
