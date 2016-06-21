import 'colors'

import Koa from 'koa'
import send from 'koa-send'
import historyApiFallback from 'koa-connect-history-api-fallback'

const app = new Koa()
const PORT = 3000


// rewrite routes to index.html
app.use(historyApiFallback({
  verbose: false,
}))

app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: `${__dirname}/` })
})

app.listen(3000)
console.log(`listening on port ${PORT}`.green)
