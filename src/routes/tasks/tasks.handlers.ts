import db from '@/db'
import type {
    CreateRoute,
    GetOneRoute,
    ListRoute,
    PatchRoute,
    RemoveRoute,
} from './tasks.route'
import type { AppRouteHandler } from '@/lib/types'
import { tasks } from '@/db/schema'
import * as HttpStatusCodes from '@/lib/status-codes'
import * as httpStatusPhrases from '@/lib/status-phrases'
import { eq } from 'drizzle-orm'

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasks = await db.query.tasks.findMany()

    return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid('json')

    const [inserted] = await db.insert(tasks).values(task).returning()

    return c.json(inserted, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid('param')
    const task = await db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id)
        },
    })

    if (!task) {
        return c.json(
            { message: httpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND
        )
    }

    return c.json(task, HttpStatusCodes.OK)
}

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid('param')
    const updates = c.req.valid('json')

    const [task] = await db
        .update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning()

    if (!task) {
        return c.json(
            { message: httpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND
        )
    }

    return c.json(task, HttpStatusCodes.OK)
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
    const { id } = c.req.valid('param')

    const result = await db.delete(tasks).where(eq(tasks.id, id))

    if (result.rowCount === 0) {
        return c.json(
            { message: httpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND
        )
    }

    return c.body(null, HttpStatusCodes.NO_CONTENT)
}
