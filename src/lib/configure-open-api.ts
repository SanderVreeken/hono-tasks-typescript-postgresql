import type { AppOpenAPI } from './types'
import { apiReference } from '@scalar/hono-api-reference'

import packageJSON from '../../package.json' with { type: 'json' }

export default function configureOpenApi(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: 'Tasks API',
        },
    })
    app.get(
        '/reference',
        apiReference({
            layout: 'classic',
            pageTitle: 'Hono API Reference',
            spec: {
                url: '/doc',
            },
            defaultHttpClient: {
                targetKey: 'js',
                clientKey: 'fetch',
            }
        }),
      )
}
