import { createRouter } from '@/lib/create-app'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '@/lib/status-codes'
import createMessageObjectSchema from '@/helpers/create-message-object-schema'
import jsonContent from '@/helpers/json-content'

const router = createRouter().openapi(
    createRoute({
        tags: ['Index'],
        method: 'get',
        path: '/',
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                createMessageObjectSchema('Tasks API'),
                'Tasks API Index'
            ),
        },
    }),
    (c) => {
        return c.json({ message: 'Tasks API' }, HttpStatusCodes.OK)
    }
)

export default router
