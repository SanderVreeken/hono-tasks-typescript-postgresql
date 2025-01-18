import { OpenAPIHono, type Hook } from '@hono/zod-openapi'
import { logger } from '@/middlewares/pino-logger'
import type { AppBindings, AppOpenAPI } from './types'

// This is the default hook that will be called for every route and is copied from the Stoker package.
const defaultHook: Hook<any, any, any, any> = (result, c) => {
    if (!result.success) {
        return c.json({ success: result.success, error: result.error }, 422)
    }
}

export function createRouter() {
    return new OpenAPIHono<AppBindings>({ strict: false, defaultHook })
}

export default function createApp() {
    const app = createRouter()
    // If needed, see tutorial on how to use favicon middleware.
    app.use(logger())

    app.notFound((c) => {
        return c.json({ message: '404 Not Found' }, 404)
    })

    app.onError((error, c) => {
        return c.json({ message: error.message }, 500)
    })

    return app
}

export function createTestApp(router: AppOpenAPI) {
    const testApp = createApp()
    testApp.route('/', router)
    return testApp
}
