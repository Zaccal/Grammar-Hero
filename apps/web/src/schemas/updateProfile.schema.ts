import * as z from 'zod/mini'

export const udpateProfileSchema = z.object({
  displayUsername: z.string().check(z.minLength(2), z.maxLength(100), z.trim()),
  image: z.nullable(z.optional(z.file())),
})

export type UdpateProfileSchema = z.infer<typeof udpateProfileSchema>
