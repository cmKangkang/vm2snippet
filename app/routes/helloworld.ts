import Router from 'koa-router'

const router = new Router()

router.get('/helloworld', async (ctx, next) => {
  ctx.body = {
    msg: "hello world"
  }
})

export default router