import createMessageObjectSchema from '@/helpers/create-message-object-schema'
import * as HttpStatusPhrases from '@/lib/status-phrases'

export const notFoundSchema = createMessageObjectSchema(
    HttpStatusPhrases.NOT_FOUND
)
