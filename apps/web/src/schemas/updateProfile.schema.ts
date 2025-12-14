import z from 'zod'

export const udpateProfileSchema = z.object({
  displayUsername: z.string().min(2),
  image: z.file().optional().nullable(),
})

export type UdpateProfileSchema = z.infer<typeof udpateProfileSchema>
