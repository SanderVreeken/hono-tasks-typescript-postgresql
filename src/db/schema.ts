import { integer, pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = pgTable('tasks', {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    name: text().notNull(),
    done: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
})

export const selectTasksSchema = createSelectSchema(tasks)

export const insertTaskSchema = createInsertSchema(tasks, {
    name: (schema) => schema.min(1).max(500),
})
    .required({
        done: true,
    })
    .omit({
        // id: true,
        createdAt: true,
        updatedAt: true,
    })

export const patchTasksSchema = insertTaskSchema.partial()
