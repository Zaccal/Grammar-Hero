import type { Context } from '@/lib/context'
import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { auth } from '@/lib/auth'

export async function setPassword(ctx: Context, data: SetPasswordSchema) {
  await auth.api.setPassword({
    body: data,
    headers: ctx.headers
  })
}
