import z from 'zod'

export const udpateProfileSchema = z.object({
  displayUsername: z.string().min(2).trim(),
  image: z.file().optional().nullable(),
})

export type UdpateProfileSchema = z.infer<typeof udpateProfileSchema>
