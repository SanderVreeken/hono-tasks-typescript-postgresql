import { z } from 'zod'

const createMessageObjectSchema = (message: string) => {
    return z
        .object({
            message: z.string(),
        })
        .openapi({
            example: {
                message,
            },
        })
}

export default createMessageObjectSchema
