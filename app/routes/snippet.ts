import Router from 'koa-router'
import axios from 'axios'

const router = new Router({
  prefix: '/snippet'
})

router.all('/:name', async (ctx, next) => {
  console.log("snippet")
  // 解析请求
  const { name } = ctx.params
  if (!name) {
    ctx.throw(400, '')
  }
  // 将请求转到 runtime
  const response = await axios.get(`http://127.0.0.1:8099/snippet/${name}`)
  if (response.status === 200) {
    ctx.body = response.data
  }
})

export default router
