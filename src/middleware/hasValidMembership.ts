import createError from 'http-errors'
import { User } from 'podverse-orm'
import { getRepository } from 'typeorm'
import { isBeforeDate } from '~/lib/utility'

export const hasValidMembership = async (ctx, next) => {
  if (ctx.state.user && ctx.state.user.id) {
    const repository = getRepository(User)
    const user = await repository.findOne({
      where: {
        id: ctx.state.user.id
      },
      select: ['freeTrialExpiration', 'membershipExpiration', 'emailVerified']
    })

    if (!user) {
      throw new createError.NotFound('User not found')
    }

    if (!user.emailVerified) {
      ctx.status = 401
      ctx.body = {
        message: 'Email Verification Required',
        code: 124
      }
      return
    }

    if (
      (user.membershipExpiration && isBeforeDate(user.membershipExpiration)) ||
      (user.freeTrialExpiration && isBeforeDate(user.freeTrialExpiration))
    ) {
      await next()
      return
    }
  }

  ctx.status = 401
  ctx.body = {
    message: 'Premium Membership Required',
    code: 123
  }
}
