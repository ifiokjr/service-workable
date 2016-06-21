import Koa from 'koa'
import send from 'koa-send'
import 'colors'

const app = new Koa()
const PORT = 3000

app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: `${__dirname}/` })
})

app.listen(3000)
console.log(`listening on port ${PORT}`.bold.green)
