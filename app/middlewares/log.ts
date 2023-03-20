import { Context, Next } from 'koa'
import pino from 'pino'

const logger = pino()

export default async function (ctx: Context, next: Next) {
  logger.info({
    Method: ctx.method,
    Url: ctx.URL
  })
  return await next()
}