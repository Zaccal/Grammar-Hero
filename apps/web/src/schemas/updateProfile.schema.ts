import z from 'zod'

export const udpateProfileSchema = z.object({
  displayUsername: z.string().min(2),
})

export type UdpateProfileSchema = z.infer<typeof udpateProfileSchema>
