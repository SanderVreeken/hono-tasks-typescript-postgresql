import { describe, expect, expectTypeOf, it } from 'vitest'
import router from './tasks.index'
import createApp, { createTestApp } from '@/lib/create-app'
import { testClient } from 'hono/testing'

// @ts-expect-error
const client = testClient(createApp().route('/', router))

describe('Tasks list', () => {
    it('responds with a list of tasks', async () => {
        const testRouter = createTestApp(router)
        const response = await testRouter.request('./tasks')
        const result = await response.json()
        console.log(result)
        // @ts-expect-error
        expectTypeOf(result).toBeArray()
    })

    it('responds with an array again', async () => {
        const response = await client.tasks.$get()
        const json = await response.json()
        // @ts-expect-error
        expectTypeOf(json).toBeArray()
    })

    it('validates the id param', async () => {
        const response = await client.tasks[':id'].$get({
            param: { id: 'wat' },
        })
        console.log(response)
        expect(response.status).toBe(422)
    })
})
