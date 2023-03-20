import Koa from "koa";
import Router from "koa-router";
import fs from 'node:fs'
import path from 'node:path'

import pino from 'pino'

import { SnippetEngine } from './engine'

const PORT = 8099;
const app = new Koa();
const router = new Router();
const logger = pino()

router.all('/:name', async (ctx, next) => {
  console.log(ctx.url)
  const { name } = ctx.params
  ctx.body = {
    msg: `hello ${name}\nit's runtime here`
  }
})

router.all('/snippet/:name', async (ctx, next) => {
  logger.info({
    Req: ctx.URL
  })

  const { name } = ctx.params
  const filepath = path.join(path.resolve(), "..", "snippets", `${name}.js`)
  if (!fs.existsSync(filepath)) {
    ctx.body = {
      stat: "fail",
      msg: "Snippet Not Fount!"
    }
    return next()
  }

  try {
    const engine = new SnippetEngine()
    const script = engine.compileFile(filepath)
    const result = await engine.run(script)
    ctx.body = {
      stat: "ok",
      data: result
    }
  } catch (error) {
    ctx.state = 500
    ctx.body = {
      stat: "error",
      data: error,
      msg: "snippet run error"
    }
  }
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT);

console.log(`runtime running at port ${PORT}`);
