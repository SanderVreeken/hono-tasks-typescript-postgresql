import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '@/lib/status-codes'
import jsonContent from '@/helpers/json-content'
import {
    insertTaskSchema,
    patchTasksSchema,
    selectTasksSchema,
} from '@/db/schema'
import jsonContentRequired from '@/helpers/json-content-required'
import createErrorSchema from '@/helpers/create-error-schema'
import IdParamsSchema from '@/helpers/id-params'
import { notFoundSchema } from '@/lib/constants'

export const list = createRoute({
    tags: ['Tasks'],
    path: '/tasks',
    method: 'get',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectTasksSchema),
            'List of tasks'
        ),
    },
})

export const create = createRoute({
    tags: ['Tasks'],
    path: '/tasks',
    method: 'post',
    request: {
        body: jsonContentRequired(insertTaskSchema, 'The task to create'),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The created task'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTaskSchema),
            'The validation error(s)'
        ),
    },
})

export const getOne = createRoute({
    tags: ['Tasks'],
    path: '/tasks/{id}',
    method: 'get',
    request: {
        params: IdParamsSchema,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The requested task'
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTaskSchema),
            'Invalid id error'
        ),
    },
})

export const patch = createRoute({
    tags: ['Tasks'],
    path: '/tasks/{id}',
    method: 'patch',
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(patchTasksSchema, 'The task updates'),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The updated task'
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(patchTasksSchema).or(
                createErrorSchema(IdParamsSchema)
            ),
            'The validation error(s)'
        ),
    },
})

export const remove = createRoute({
    tags: ['Tasks'],
    path: '/tasks/{id}',
    method: 'delete',
    request: {
        params: IdParamsSchema,
    },
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: 'Task deleted',
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'Invalid id Error'
        ),
    },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
